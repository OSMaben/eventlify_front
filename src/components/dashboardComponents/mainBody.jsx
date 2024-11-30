import SideBar from './sideBar';
import Analytics from "./analytics"
import Graphics from "./graphics"
import { useEffect, useState } from 'react';
import axiosInstance from '../../lib/api/axiosInstance';
import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import TableOfContent from './TableOfContent'
import ModalUpate from "./Modal"



export default function MainBody() {

    return (
        <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <main>
                <div class="flex flex-col md:flex-row">
                    <SideBar />
                    <section className="w-full">
                        <div id="main" class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">

                            <div class="bg-gray-800 pt-3">
                                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                                    <h1 class="font-bold pl-2">Events</h1>
                                </div>
                            </div>

                            <Analytics />
                            <Graphics />
                        </div>
                        <ModalUpate/>
                        
                            <TableOfContent/>    

                    </section>
                </div>
            </main>

        </>
    )
}