
  import axiosClient from "@/apiClient/axiosClient";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import { debounce } from "lodash";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import EditVoucher from "@/components/admin/crudform/edit/EditVoucher";
import { CodeFilled, CodeOutlined, DeleteFilled, DisconnectOutlined, LoadingOutlined, MessageFilled, PlusCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import {
  Button,
  DatePicker,
  Form,
  Input,
  List,
  message,
  Modal,
  Spin,
  Switch,
  Table,
  TablePaginationConfig,
  Tooltip,
} from "antd";
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import cloudServerColumns from "@/components/table_columns/cloud_server";
import axios from "axios";
import VpsStatus, { VpsStatusEnum } from "@/components/vps/status";
import TerminalController from "@/components/vps/Terminal";
import { toast } from "react-toastify";
import XtermUI from "@/components/app/Xterm.component";
import { SSHInfo } from "@/pages/terminal";

const Page = () => {
  const t = useTranslations("MyLanguage");
  const p = useTranslations("Placeholder");
  const router = useRouter();
  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword || ""
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const { data, isFetching, isError } = useQuery({
    queryKey: ["vpsdata", router.asPath],
    queryFn: () =>
      axios.get("https://api.golive365.top/vps/real-vps-data", {
      }),
    placeholderData: (previousData) => previousData,
  });

  console.log(data);
  

  const columns = cloudServerColumns(t);
  columns.push({
    title: t('status'),
    key: "status",
    dataIndex: "status",
    render:(text:string, record: any)=>{
      return(
        <>
        <VpsStatus record={record}/>
        </>
      )
    }
  })
  const [showTerminal,setShowTerminal] = useState(false)
  const hideTerninal = ()=>{ 
   setShowTerminal(false)
  }
  const showModalTerminal = ()=>{ 
    setShowTerminal(true)
   }
  columns.push({
    title: t('status'),
    key: "ipv4",
    dataIndex: "ipv4",
    render: (_text: string, record:any)=><div className="flex gap-1">
     
     <Tooltip title="Send message">
     <Button type="default" style={{color: "burlywood"}} onClick={()=>{
       axios.get('https://api.golive365.top/check-health', {
        params: {
          port: 3002,
          ipv4: record.ipv4
        },
        headers: {
          'accept': '*/*'
        },
        timeout: 3000
      })
      .then((response) => {
        message.success(response.data)
      })
      .catch((error) => {
        message.error(error.message)
      });
     }}><MessageFilled/></Button>
     </Tooltip>
     
     {/* <TableAction deleteForm={<></>} openState={showModal} /> */}
     
    </div>
  })
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };
  const handleKeyword = debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const sshInfo: SSHInfo = {
    ipv4OrHost: "	",
    sshUser: "3002"
  };
  return (
    <>
      <Title className="text-center" level={2}>
        Autolive vps
      </Title>
      <Modal title="Terminal" open={showTerminal} width={850} footer={null} onCancel={hideTerninal}>
          <XtermUI SSHInfo={sshInfo} connectionState={false} />
      </Modal>
      
      <div className="flex justify-between items-center my-3">
        <div id="filter">
          <Input
            defaultValue={keyword}
            placeholder={p("search")}
            style={{ width: 200 }}
            onChange={handleKeyword}
          />
        </div>
      </div>
      <Table
        className="border rounded-md shadow-md"
        dataSource={data?.data.map((vps:any, index: number)=>({...vps, key: index+1}))}
        columns={columns}
        loading={isFetching}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
      
      />
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
