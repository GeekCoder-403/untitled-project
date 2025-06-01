import { Outlet, useNavigation } from "@remix-run/react";
import Navbar from "~/components/layout/Navbar";
import Sidebar from "~/components/layout/Sidebar";
import { useEffect } from 'react';
import { LoadingBarContainer, useLoadingBar } from 'react-top-loading-bar';

const LoadingBarHandler = () => {
    const navigation = useNavigation();
    const { start, complete } = useLoadingBar();

    useEffect(() => {
        if (navigation.state === 'loading' || navigation.state === 'submitting') {
            start();
        } else {
            complete();
        }
    }, [navigation.state, start, complete]);

    return null;
};

export default function HomeLayout() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto p-4 bg-gray-300 shadow-md">
                    <div className="w-full bg-white shadow-md rounded-md">
                        <LoadingBarContainer
                            props={{
                                color: "#85bec3",
                                height: 4,
                                shadow: true
                            }}
                        >
                            <LoadingBarHandler />
                            <Outlet />
                        </LoadingBarContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
