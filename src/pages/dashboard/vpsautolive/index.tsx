
  import axiosClient from "@/apiClient/axiosClient";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import { debounce } from "lodash";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import EditVoucher from "@/components/admin/crudform/edit/EditVoucher";
import { DeleteFilled, DisconnectOutlined, LoadingOutlined, MessageFilled, PlusCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import {
  Button,
  DatePicker,
  Form,
  Input,
  List,
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
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const token = getCookie("token");

  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword || ""
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", router.asPath],
    queryFn: () =>
      axios.get("https://api.golive365.top/list", {
        params: {
          keyword: keyword,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });

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
     <Tooltip title="Access command">
      <Button size="small" className="!bg-black !text-white" onClick={showModalTerminal}>&gt;_</Button>
     </Tooltip>
     <Tooltip title="Send message">
     <Button type="default" size="small" style={{color: "burlywood"}} onClick={()=>{
      console.log(record.ipv4+":"+record.port);
       axios.get('https://api.golive365.top/check-health', {
        params: {
          port: record.port,
          ipv4: record.ipv4
        },
        headers: {
          'accept': '*/*'
        },
        timeout: 3000
      })
      .then((response) => {
        toast.success(response.data)
      })
      .catch((error) => {
        toast.error(error.message)
      });
     }}><MessageFilled/></Button>
     </Tooltip>
     
     {/* <TableAction deleteForm={<></>} openState={showModal} /> */}
     
    </div>
  })
  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };
  const handleKeyword = debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const d = useTranslations("DashboardMenu");
  useEffect(() => {
    if (
      keyword == "" &&
      pageSize == 10 &&
      pageIndex == 1 &&
      router.asPath == "/dashboard/vps"
    )
      return;
    router.push(router, {
      query: {
        keyword: keyword,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, pageIndex, pageSize]);
  const sshInfo: SSHInfo = {
    ipv4OrHost: "sysliveserve.vps.webdock.cloud",
    sshUser: "phamquan"
  };
  return (
    <>
      <Title className="text-center" level={2}>
        Autolive vps
      </Title>
      <Modal title="Terminal" open={showTerminal} width={850} footer={null} onCancel={hideTerninal}>
          <XtermUI SSHInfo={sshInfo} connectionState={false}/>
      </Modal>
      
      <Modal
        title={t("create")}
        open={showModal}
        onCancel={hideModal}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label={t('ipv4')}
            name="ipv4"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SSH user:"
            name="user"
            rules={[{ required: true, message: "Please enter a code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SSH password "
            name="password"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter a valid min price",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
      
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add vps
            </Button>
          </Form.Item>
        </Form>
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

        <Button
          type="primary"
          id="create"
          icon={<PlusCircleFilled />}
          iconPosition="end"
          onClick={openModal}
        >
          {t("create")}
        </Button>
      </div>
      <Table
        className="border rounded-md shadow-md"
        dataSource={[{}]}
        columns={columns}
        loading={isFetching}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        pagination={{
          total: data?.data.total,
          pageSize: pageSize,
          current: pageIndex,
          showSizeChanger: true,
        }}
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
