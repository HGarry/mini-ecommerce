"use client";
import { useParams } from "next/navigation";

function DynamicRoute() {
    const {id} = useParams();
    return <div className="">DynamicRoute {id}</div>
}

export default DynamicRoute;