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

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const token = localStorage.getItem('token');

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/events', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(response.data);
        } catch (err) {
            console.error("Error:", err);
            setErrors(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const addNewEvent = (newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    const deleteEvent = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    };


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
                        <ModalUpate 
                            addNewEvent={addNewEvent} 
                            token={token}
                        />
                        <TableOfContent 
                            events={events} 
                            loading={loading} 
                            errors={errors}
                            deleteEvent={deleteEvent}
                        />

                    </section>
                </div>
            </main>

        </>
    )
}