import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  MenuOutlined,
  PlusCircleFilled,
  UploadOutlined,
} from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import { getCookie } from "cookies-next";
import axios from "axios";
import Title from "antd/es/typography/Title";
import { useTranslations } from "next-intl";
import DeleteForm from "@/components/admin/DeleteForm";
import EditPlatForm from "@/components/admin/crudform/edit/EditPlatform";
import TableAction from "@/components/admin/TableAction";
import format from "@/hooks/dayjsformatter";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import _, { debounce } from "lodash";
import { TablePaginationConfig } from "antd/lib";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<MenuOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const Page: React.FC = () => {
  const router = useRouter();
  const token = getCookie("token");
  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword
  );

  const { data, isFetching } = useQuery({
    queryKey: ["platform", router.asPath],
    queryFn: () =>
      axiosClient.get(`/platform/list?language=${router.locale}`, {
        params: {
          keyword: keyword,
        },
      }),
  });

  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.data) {
      const sortedData = data.data.data.sort(
        (a: any, b: any) => b.entry - a.entry
      );

      setDataSource(
        sortedData.map((item: any, index: number) => ({
          ...item,
          key: index, // Use item ID as string for the key
          location: index + 1, // Initialize location field
        }))
      );
    }
  }, [data]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record: any) => record.key === active.id
        );
        const overIndex = prevState.findIndex(
          (record: any) => record.key === over?.id
        );
        const newState = arrayMove(prevState, activeIndex, overIndex);
        const updatedState = newState.map((item: any, index) => ({
          ...item,
          location: index + 1, // Update location to be 1-based index
        }));

        const data1 = {
          data: updatedState.map((item) => ({
            id: item.id,
            location: item.location,
          })),
        };

        const url = "/platform/location?language=en";
        const headers = {
          accept: "*/*",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        };

        axiosClient
          .post(url, data1, { headers })
          .then((res) => {
            toast.success(res.data.message);
            setDataSource(updatedState); // Update state only after successful POST
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });

        return updatedState; // Optimistically update the state
      });
    }
  };
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const [pageIndex, setpageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const [openState, setOpenState] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => {
    setShowModal(false);
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };
  const d = useTranslations("DashboardMenu");
  const t = useTranslations("MyLanguage");
  const columns: ColumnsType<any> = [
    { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
    {
      title: t("entryno"),
      dataIndex: "location",
      key: "location",
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (text: string) => {
        return (
          <>
            <Image src={text} width={25} alt="" />
          </>
        );
      },
    },
    {
      title: t("createAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => <>{format(text, router.locale || "en")}</>,
    },
    {
      width: "15%",
      align: "center",
      title: t("action"),
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
            <TableAction
              openState={openState}
              // viewDetail={
              //   <>
              //     <PlatformDetail />
              //   </>
              // }
              // syncFunc={() => {
              //   //synchonized data here
              // }}
              editForm={
                <>
                  <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                  >
                    <EditPlatForm initialValues={record} />

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              }
              deleteForm={
                <DeleteForm
                  onDelete={() => {
                    axiosClient
                      .delete(`/platform/delete/${text}/?language=en`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then(() => {
                        console.log("ok");

                        toast.success("success");
                      })
                      .catch((err) => {
                        console.log(err);

                        toast.error(err.message);
                      });
                    setOpenState(!openState);
                  }}
                  onCancel={() => {
                    setOpenState(!openState);
                  }}
                />
              }
            />
          </div>
        );
      },
    },
  ];
  const handleSearch = debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const handleTable = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    setPageSize(pagination.pageSize || 10);
    setpageIndex(pagination.current || 1);
  };
  useEffect(() => {
    if (
      keyword == null &&
      pageSize == 10 &&
      pageIndex == 1 &&
      router.asPath == "/dashboard/platform"
    )
      return;
    router.push(router, {
      query: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword,
      },
    });
  }, [pageIndex, pageSize, keyword]);
  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <ToastContainer />
      <div className="py-2">
        <Title level={2} className="text-center">
          {d("platform")}
        </Title>
        <Modal
          title="Upload form"
          open={showModal}
          footer={null}
          onCancel={hideModal}
        >
          <div>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Title">
                <Input placeholder="Enter title" />
              </Form.Item>
              <Form.Item label="Upload File" name="file">
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        <div className="flex justify-between">
          <div id="filter">
            <Input
              defaultValue={keyword}
              placeholder="Search..."
              className="!py-1"
              onChange={handleSearch}
              style={{ width: 200 }}
            />
          </div>

          <Button
            id="create"
            icon={<PlusCircleFilled />}
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            {t("create")}
          </Button>
        </div>
      </div>

      <SortableContext
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          onChange={handleTable}
          className="border rounded-md shadow-md"
          rowKey="key"
          components={{ body: { row: Row } }}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            current: pageIndex,
            // position: ["bottomCenter"],
          }}
          scroll={{ x: 600 }}
          loading={isFetching}
        />
      </SortableContext>
    </DndContext>
  );
};

export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
