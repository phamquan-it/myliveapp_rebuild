
  import axiosClient from "@/apiClient/axiosClient";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import { debounce } from "lodash";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import EditVoucher from "@/components/admin/crudform/edit/EditVoucher";
import { CaretRightOutlined, DeleteFilled, DisconnectOutlined, FileOutlined, LoadingOutlined, MessageFilled, PlusCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import {
  Button,
  DatePicker,
  Form,
  Input,
  List,
  Modal,
  Select,
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
import { FaRunning, FaSquare } from "react-icons/fa";
import { WEBDOCK_TOKEN } from "../../../../WEBDOCK_PROVIDER/constant/Token";

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
    queryKey: ["webdock", router.asPath],
    queryFn: () =>
      axios.get("https://api.webdock.io/v1/servers", {
        params: {
          keyword: keyword,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
        headers: {
          Authorization: `Bearer ${WEBDOCK_TOKEN}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });

  const [showTerminal,setShowTerminal] = useState(false)
  const hideTerninal = ()=>{ 
   setShowTerminal(false)
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => {
    setShowModal(false);
  };
  const [openState,setOpenState] = useState(false)
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

  return (
    <>
      <Title className="text-center" level={2}>
        Webdock
      </Title>
      <Modal title="Terminal" open={showTerminal} footer={null} onCancel={hideTerninal}>
          <TerminalController />
      </Modal>
      
      <Modal
        title={t("create")}
        open={showModal}
        onCancel={hideModal}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label={t('name')}
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Slug"}
            name="slug"
            rules={[{ required: true, message: "Please enter a slug" }]}
          >
            <Input />
          </Form.Item>
          <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label={t('location')}
            name="locationId"
            rules={[{ required: true, message: "Please select an location" }]}
          >
              <Select
                showSearch
                placeholder="Select location"
                options={[]}
              />
              
          </Form.Item>
          
          <Form.Item
            label={t('virtualization')}
            name="virtualization"
            initialValue={"container"}
            rules={[{ required: true, message: "Please select an virtualization" }]}
          >
              <Select
                showSearch
                placeholder="Select location"
                options={[
                  {
                  label:"container",
                  value:"container"
                  },
                  {
                    label:"kvm",
                    value:"kvm"
                  }
                ]}
              />
              
          </Form.Item>
          </div>

          <Form.Item
            label={'Profile slug'}
            name="profileSlug"
            rules={[{ required: true, message: "Select profileSlug" }]}
          >
              <Select
                showSearch
                placeholder="Select location"
                options={[]}
              />
              
          </Form.Item>
          <Form.Item
            label={('Image slug')}
            name="imageSlug"
            rules={[{ required: true, message: "Please select an image slug" }]}
          >
              <Select
                showSearch
                placeholder="Select ImageSlug"
                options={[]}
              />
              
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
      <Modal title="Script" open={false} footer={null}>
          <p></p>
      </Modal>
      
      <Table
        className="border rounded-md shadow-md"
        dataSource={data?.data.map((item: any, index: number) => ({
          ...item,
          key: pageIndex * pageSize + (index + 1) - pageSize,
        }))}
        columns={[
          {
            title: t('entryno'),
            dataIndex: "key"
          },
          {
            title: "Slug",
            dataIndex:"slug",
          },
          {
            title: t('name'),
            dataIndex:"name",
          },
          {
            title: t('createAt'),
            dataIndex:"data",
          },
          {
            title: t('location'),
            dataIndex:"location",
          },
          {
            title: "Image",
            dataIndex:"image",
          },
          {
            title: "Profile",
            dataIndex:"profile",
          },
          {
            title: t('ipv4'),
            dataIndex:"ipv4",
          },
          {
            title: "ipv6",
            dataIndex:"ipv6",
          },
          {
            title: t('virtualization'),
            dataIndex:"virtualization",
          },
          {
            title: "Desc",
            dataIndex:"description",
          },
          {
            title: t('action'),
            dataIndex: ('slug'),
            render:(text, record)=>(<>
           <div className="flex gap-1">
            <Button type="default"><FileOutlined /></Button>
            
           {(record.status == 'running')?(<Button type="primary" className={(record.status == 'stopped'?"!hidden":"")} danger onClick={()=>{
             async function stopServer() {
              const url = 'https://api.webdock.io/v1/servers/'+text+'/actions/stop';
              const headers = {
                  Authorization: 'Bearer '+WEBDOCK_TOKEN,
                  Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
              };
          
              try {
                  const response = await axios.post(url, null, { headers });
                  // alert('ok')
              } catch (error:any) {
                  alert('nook')
              }
              router.push(router)
          }
          
          // Call the function to stop the server
          stopServer();
            }}><FaSquare/></Button>):<Button type="primary" className={(record.status == 'running'?"hidden":"")} onClick={()=>{
              async function stopServer() {
               const url = 'https://api.webdock.io/v1/servers/'+text+'/actions/start';
               const headers = {
                   Authorization: 'Bearer '+WEBDOCK_TOKEN,
                   Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
               };
           
               try {
                   const response = await axios.post(url, null, { headers });
                  //  alert('ok')
               } catch (error:any) {
                   alert('nook')
               }
               router.push(router)
           }
           
           // Call the function to stop the server
           stopServer();
           router.push(router)
             }} ><CaretRightOutlined /></Button>}
           
           <TableAction deleteForm={<>
            <Title level={5}>{t('areyousure')}</Title>
           <div className="flex justify-end gap-1">
            <Button type="primary" onClick={()=>{
              setOpenState(!openState)
            }}>{t('cancel')}</Button>
           <Button type="primary" danger onClick={()=>{
            async function deleteServer() {
              const url = 'https://api.webdock.io/v1/servers/'+text;
              const headers = {
                  Authorization: 'Bearer '+WEBDOCK_TOKEN,
                  Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
              };
          
              try {
                  await axios.delete(url, { headers });
                  alert('ok')
              } catch (error:any) {
                  alert('nook')
              }
              setOpenState(!openState)
          }
          
          // Call the function to stop the server
          deleteServer();
          router.push(router)
           }}>{t('accept')}</Button>
           </div>
            </>} openState={openState}/>
           </div>
            
            </>)
          }
        ]}
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
