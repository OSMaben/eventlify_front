import 'flowbite';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


export default function ModalUpate() {

    const token = localStorage.getItem('token');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);


    const [formData, setFormDate] = useState({
        name: '',
        date: '',
        membe: '',
        location: '',
        description:''
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
            } catch (err) {
                console.error("Error:", err);
                setErrors(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [events]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDate({ ...formData, [name]: value });
    };  


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                'http://localhost:3000/events',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Event created:', response.data);
            setEvents(prev=>prev+1)
            toast.success('Event created successfully!')
        } catch (err) {
            console.error('Error creating event:', err);
            toast.error('Event created successfully!')
        }
    };

    return (
        <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <div class="flex justify-center m-5">
                <button id="defaultModalButton" data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white  bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-primary-700 bg-red-500"  type="button">
                    Create Event
                </button>
            </div>

            <div id="defaultModal" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Product
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Event Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        date
                                    </label>
                                    <input
                                        type="text"
                                        name="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                                        placeholder="date"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="participants"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        participants
                                    </label>
                                    <input
                                        type="number"
                                        name="participants"
                                        id="participants"
                                        value={formData.participants}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Max participants"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                                        placeholder="location"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
                                        placeholder="Event description"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                class="block text-white  bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-primary-700 bg-red-500"
                            >
                                Add new Event
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}