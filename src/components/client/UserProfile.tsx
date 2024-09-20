import axiosClient from "@/apiClient/axiosClient";
import axiosInstance from "@/apiClient/axiosConfig";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Image, Input, Progress, Switch, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Button } from "antd/lib";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { isError } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "use-intl";

interface userProfileProps {
  email: string;
  name: string;
  funds: string;
  role: string;
  active: number;
}

const UserProfile: React.FC<userProfileProps> = (props) => {
  const token = getCookie("token");
  const router = useRouter();
  const onFinish = (values: any) => {
    if (values.confirmpassword == values.newpassword) {
      const user = data?.data?.data;
      axiosInstance
        .patch(
          `/user/update/${user.id}?language=en`,
          {
            ...user,
            old_password: values.oldpassword,
            new_password: values.newpassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        });
    } else {
      toast.error("Confirm password does not match");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const { data, isSuccess } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () =>
      axiosInstance.get("/user/info?language=en", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });
  const t = useTranslations("UserProfile");
  return (
    <>
      <Title level={2} className="text-center !font-medium">
        {t("profile")}
      </Title>
      <div className="w-10/12 grid md:grid-cols-2 m-auto gap-9 shadow-md p-4 rounded-md border min-w-80">
        <div>
          <ToastContainer />
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              labelAlign="left"
              initialValues={{ name: data?.data?.data?.name }}
              onFinish={(value) => {
                // console.log(value.name);

                const user = data?.data?.data;
                axiosClient
                  .patch(
                    `/user/update/${user.id}?language=en`,
                    {
                      ...user,
                      name: value.name,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    toast.success(res.data.message);
                  })
                  .catch((err) => {
                    toast.error(err.message);
                    console.log(err);
                  });
              }}
            >
              <Form.Item
                label={<span className="font-medium">{t("name")}</span>}
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
                className="flex justify-end"
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="me-11"
                >
                  {t("update")}
                </Button>
              </Form.Item>
            </Form>
          
        </div>

        <Form
          name="passwordChange"
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={<span className="font-medium">{t("oldpassword")}</span>}
            name="oldpassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">{t("newpassword")}</span>}
            name="newpassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">{t("confirmpassword")}</span>}
            name="confirmpassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 5, span: 16 }}
            className="flex justify-end"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="me-10"
            >
              {t("changepassword")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UserProfile;
