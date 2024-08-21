import { CaretRightOutlined, DeleteFilled, EllipsisOutlined, MenuOutlined, PauseCircleFilled, PauseOutlined, PlaySquareTwoTone, SignalFilled, StopFilled, SyncOutlined } from "@ant-design/icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useMutation } from "@tanstack/react-query";
import { Button, Dropdown, message, Modal, Tooltip } from "antd";
import { MenuProps } from "antd/lib";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircle, FaRunning, FaSquarespace } from "react-icons/fa";
import { TbSquare, TbTriangle, TbTriangleFilled } from "react-icons/tb";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import axiosInstance from "@/apiClient/axiosConfig";
import StopVps from "@/components/vps/action/StopVps";
import StopAllLive from "@/components/vps/action/StopAllLive";
import RestartVps from "@/components/vps/action/RestartVps";
import DeleteVps from "@/components/vps/action/DeleteVps";
interface VpsHideOptionProps {
    vps: any
}
const VpsHideOption: React.FC<VpsHideOptionProps> = ({ vps }) => {
    const [vpsState, setVpsState] = useState(vps.status)

    //get vps info 
    const getVpsInfo = useMutation({
        mutationFn: () => axios.get(`https://api.webdock.io/v1/servers/${vps.slug}`,
            webdockConfig),
        onSuccess: (data) => {
            if (data.data.status != 'stopped' || data.data.status != 'running')
                setVpsState(data.data.status);
        }
    });

    //stop vps mutation
    const { mutate, isPending, isError, data } = useMutation({
        mutationFn: () =>
            axios.post(`https://api.webdock.io/v1/servers/${vps.slug}/actions/stop`, null, webdockConfig),
        onSuccess: () => {
            message.success("Success");
            setVpsState("stopping")
        },
        onError: (err) => {
            message.error('Error')
        }
    });
    //start vps mutation
    const startVps = useMutation({
        mutationFn: () =>
            axios.post(`https://api.webdock.io/v1/servers/${vps.slug}/actions/start`, null, webdockConfig),
        onSuccess: () => {
            message.success("Success");
            setVpsState("starting")
        },
        onError: (err) => {
            message.error('Error')
        }
    });

    useEffect(() => {
        const updateState = setTimeout(() => {

            if (vpsState != 'stopped' || 'running') {
                getVpsInfo.mutate()
            }
        }, 8000)
    }, [data, startVps.data])
    //delete vps mutation
    const deleteVps = useMutation({
        mutationFn: () =>
            axios.delete(`https://api.webdock.io/v1/servers/${vps.slug}`, webdockConfig),
        onSuccess: () => {
            message.success("Success");
            setVpsState("stopping")
        },
        onError: (err) => {
            message.error('Error')
        }
    });
    //stop all live mutation
    const stopAllLive = useMutation({
        mutationFn: () =>
            axiosInstance.post("/autolive-control/stop-all-live", {
                ipv4: vps.ipv4
            }),
        onSuccess: () => {
            message.success("Success");
        },
        onError: (err) => {
            message.error('Error')
        }
    });
    // restart vps mutation
    const restartVps = useMutation({
        mutationFn: () =>
            axios.post(`https://api.webdock.io/v1/servers/${vps.slug}/actions/reboot`, null, webdockConfig),
        onSuccess: () => {
            message.success("Success");
        },
        onError: (err) => {
            message.error('Error')
        }
    });

    // dropdown item
    const items = [
        { icon: <TbTriangle style={{ color: "green" }} />, label: 'Start', key: 'start' }, // 菜单项务必填写 key
        {
            icon: <TbSquare style={{
                color: "red"
            }} />, label: <StopVps stopfunction={mutate} />, key: 'stop'
        }, // 菜单项务必填写 key
        {
            icon: <SignalFilled style={{
                color: "red"
            }} />, label: <StopAllLive stopfunction={stopAllLive.mutate} />, key: 'stopAllStream'
        },
        {
            icon: <SyncOutlined style={{
                color: "#1677ff"
            }} />, label: <RestartVps restartfunction={restartVps.mutate} />, key: 'restart'
        },
        {
            //disabled: true,
            icon: <DeleteFilled style={{
                color: "red"
                }} />, label: <DeleteVps deletefunction={deleteVps.mutate} slug={vps.slug}/>, key: 'delete'
        }, // 菜单项务必填写 key
    ];
    // handle dropdown
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
        switch (e.key) {
            case 'start':
                if (vpsState == 'running') {
                    message.info("This server is runing");
                    return;
                }
                console.log('Start clicked');
                startVps.mutate()
                // Add your logic for 'Start' here
                break;
            default:
                break;
        }
    };
    return (
        <>

            <Dropdown trigger={['click']} menu={{ items, onClick: handleMenuClick }}>
                <Tooltip title={vps.status}>
                    <Button type="primary" danger={(vpsState?.includes("stop"))} onClick={() => {
                        message.success(vps.slug)
                    }}
                        loading={vpsState == "stopping"
                            || vpsState == "starting"
                            || vps.status == 'provisioning'}
                        icon={<CaretRightOutlined />}>

                    </Button>
                </Tooltip>

            </Dropdown>
        </>
    );
}
export default VpsHideOption
