import 'flowbite';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ModalUpdate({ addNewEvent }) {
    const token = localStorage.getItem('token');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    const [formData, setFormDate] = useState({
        name: '',
        date: '',
        participants: '',
        location: '',
        description: '',
    });

    // Fetch events initially
    useEffect(() => {
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

        fetchEvents();
    }, []); // Empty dependency to fetch once on mount

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
            addNewEvent(response.data); 
            toast.success('Event created successfully!');
            
            setFormDate({
                name: '',
                date: '',
                participants: '',
                location: '',
                description: '',
            });
        } catch (err) {
            console.error('Error creating event:', err);
            toast.error('Error creating event!');
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            {/* Modal Trigger Button */}
            <div className="flex justify-center m-5">
                <button
                    id="defaultModalButton"
                    data-modal-target="defaultModal"
                    data-modal-toggle="defaultModal"
                    className="block text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5"
                    type="button"
                >
                    Create Event
                </button>
            </div>

            {/* Modal Content */}
            <div id="defaultModal" aria-hidden="true" className="hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
                <div className="relative p-4 w-full max-w-2xl h-full">
                    <div className="relative bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center pb-4 mb-4 border-b">
                            <h3 className="text-lg font-semibold">Add Event</h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto"
                                data-modal-toggle="defaultModal"
                            >
                                <span className="sr-only">Close modal</span>
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border rounded-lg block w-full p-2.5"
                                        placeholder="Event Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border rounded-lg block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="participants" className="block mb-2 text-sm font-medium">
                                        Participants
                                    </label>
                                    <input
                                        type="number"
                                        name="participants"
                                        id="participants"
                                        value={formData.participants}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border rounded-lg block w-full p-2.5"
                                        placeholder="Max participants"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border rounded-lg block w-full p-2.5"
                                        placeholder="Event Location"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="block w-full text-sm bg-gray-50 border rounded-lg p-2.5"
                                        placeholder="Event Description"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="block text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Add new Event
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
