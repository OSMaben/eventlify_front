// TableOfContent.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import ParticipantsModal from './participantModal';
import UpdateEvent from './updateEvent';

export default function TableOfContent({ events, loading, errors, deleteEvent }) {
    const [deleted, setDeleted] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventsList, setEventsList] = useState(events);

    const token = localStorage.getItem('token');

    useEffect(() => {
        setEventsList(events);
    }, [events]);

    const handleUpdateEvent = async (updatedEventData) => {
        try {
            const response = await axios.patch(
                `http://localhost:3000/events/${selectedEvent._id}`,
                updatedEventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Update the local state with the updated event
            const updatedEvents = eventsList.map((event) =>
                event._id === selectedEvent._id ? { ...event, ...updatedEventData } : event
            );
            setEventsList(updatedEvents);
            
            toast.success('Event updated successfully! 🎉');
            handleModalClose();
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('Failed to update event');
        }
    };

    const DeleteEvent = async (IdEvent) => {
        try {
            await axios.delete(`http://localhost:3000/events/${IdEvent}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            deleteEvent(IdEvent);
            toast.success('Event has been deleted 😃');
        } catch (err) {
            console.log(err);
            toast.error('Error deleting event');
        }
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <>
            <div className="p-6 overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                Event Name
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                Image
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                Date
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                Members
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                Address
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsList.map((event) => (
                            <tr key={event._id}>
                                <td className="p-4 border-b border-blue-gray-50">{event.name}</td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <img
                                        src="https://www.eventbookings.com/wp-content/uploads/2024/01/Different-Types-of-Events-in-2024-Which-is-Right-for-You.jpg"
                                        alt={event.name}
                                        className="rounded-md w-9 h-9 object-cover"
                                    />
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">{event.date}</td>
                                <td className="p-4 border-b border-blue-gray-50">{event.participants}</td>
                                <td className="p-4 border-b border-blue-gray-50">{event.location}</td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <button
                                        className="relative align-middle select-none font-sans font-medium text-center uppercase w-10 h-10 rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10"
                                        onClick={() => handleEditClick(event)}
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => DeleteEvent(event._id)}
                                        className="relative align-middle select-none font-sans font-medium text-center uppercase w-10 h-10 rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10"
                                    >
                                        <Trash className="h-5 w-5" />
                                    </button>
                                    <ParticipantsModal eventId={event._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && selectedEvent && (
                <UpdateEvent 
                    event={selectedEvent} 
                    onUpdate={handleUpdateEvent}
                    onClose={handleModalClose} 
                />
            )}
        </>
    );
}