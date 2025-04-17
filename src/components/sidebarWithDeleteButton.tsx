"use client";

import dynamic from "next/dynamic";

// Dynamically import the DeleteButton component
const DeleteButton = dynamic(() => import('@/components/sidebarDeleteButton'), { ssr: false });

export default DeleteButton;
