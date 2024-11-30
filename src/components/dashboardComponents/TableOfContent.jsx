import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';


export default function TableOfContent(){


    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState([]);   
    const [loading, setLoading] = useState([]);
    const [deleted, setDeleted] = useState(0);


    const token = localStorage.getItem('token');
    useEffect(() => {

        const FetchEvents = async () => {

            try {
                
                const response = await axios.get('http://localhost:3000/events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response)
                setEvents(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error:", err); // Log the entire error object
                setErrors(err.message || "Something went wrong");
                setLoading(false);
            }
        };

        FetchEvents();
    }, []);


    const DeleteEvent = async (IdEvent)  => {
        try
        {
            const response = await axios.delete(`http://localhost:3000/events/${IdEvent}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);

            toast.success('event Has been deleted 😃')
            setEvents((prevEvents) => prevEvents.filter(event => event._id !== IdEvent));

        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <>
                <div class="p-6 overflow-scroll px-0">
                            <table class="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Event Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                            </p>
                                        </th>
                                        <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Image <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                            </p>
                                        </th>
                                        <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Date <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                            </p>
                                        </th>
                                        <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Members <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                            </p>
                                        </th>
                                        <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Address <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                            </p>
                                        </th>
                                        <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Actions</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {events.map((event) => (
                                    <tr key={event._id}>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex items-center gap-3">
                                                <div class="flex flex-col">
                                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{event.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex items-center gap-3">
                                                <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg" alt="Laurent Perrier" class="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md" />
                                               
                                            </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                                    <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{event.date}</p>
                                                </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex flex-col">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{event.participants}</p>
                                            </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="w-max">
                                                <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-yellow-500/20 text-yellow-600 py-1 px-2 text-xs rounded-md" >
                                                    <span class="">{event.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                      
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <Edit className="h-5 w-5" />
                                                </span>
                                               
                                            </button>
                                            <button onClick={() => DeleteEvent(event._id)}    class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <Trash className="h-5 w-5" />
                                                </span>
                                            </button>

                                            
                                        </td>
                                    </tr>
                                    ))}
                                   
                                </tbody>
                            </table>
                        </div>
        </>
    )
}