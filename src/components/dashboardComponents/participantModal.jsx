import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ParticipantsModal({ eventId }) {
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState({
        username: '',
        email: '',
        phone: '',
        role :''
    });
    const [loading, setLoading] = useState(false);

    const fetchParticipants = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/events/MembersEvents/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setParticipants(response.data);
            console.log('sss', response.data)
        } catch (err) {
            console.error("Error fetching participants:", err);
            toast.error('Failed to fetch participants');
        } finally {
            setLoading(false);
        }
    };

    const handleAddParticipant = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/events/${eventId}/participants`, 
                newParticipant,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
            // Add new participant to the list
            setParticipants([...participants, response.data]);
            
            // Reset form
            setNewParticipant({ name: '', email: '', phone: '', role: '' });
            
            toast.success('Participant added successfully!');
        } catch (err) {
            console.error("Error adding participant:", err);
            toast.error('Failed to add participant');
        }
    };

    const handleRemoveParticipant = async (participantId) => {
        try {
            await axios.post(
                `http://localhost:3000/events/${eventId}/RemoveParticipants/${participantId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
            // Remove participant from the list
            setParticipants(participants.filter(p => p._id !== participantId));
            
            toast.success('Participant removed successfully!');
        } catch (err) {
            console.error("Error removing participant:", err);
            toast.error('Failed to remove participant');
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button 
                onClick={() => {
                    setIsOpen(true);
                    fetchParticipants();
                }}
                className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" 
                type="button"
            >
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <UserPlus className="h-5 w-5" />
                </span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-3xl mx-auto my-6">
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                <h3 className="text-2xl font-semibold">
                                    Event Participants
                                </h3>
                                <button
                                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="block w-6 h-6 text-2xl text-black bg-transparent opacity-5 focus:outline-none">
                                        <X />
                                    </span>
                                </button>
                            </div>

                            {/* Add Participant Form */}
                            <form onSubmit={handleAddParticipant} className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newParticipant.name}
                                            onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                                            className="bg-gray-50 border rounded-lg block w-full p-2.5"
                                            placeholder="Participant Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newParticipant.email}
                                            onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
                                            className="bg-gray-50 border rounded-lg block w-full p-2.5"
                                            placeholder="Participant Email"
                                            required
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="mt-4 block text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Add Participant
                                </button>
                            </form>

                            {/* Participants List */}
                            <div className="p-6">
                                <h4 className="text-xl font-semibold mb-4">Current Participants</h4>
                                {loading ? (
                                    <p>Loading participants...</p>
                                ) : participants.length === 0 ? (
                                    <p>No participants yet</p>
                                ) : (
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border p-2">Name</th>
                                                <th className="border p-2">Email</th>
                                                <th className="border p-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {participants.map((participant) => (
                                                <tr key={participant._id}>
                                                    <td className="border p-2">{participant.name}</td>
                                                    <td className="border p-2">{participant.email}</td>
                                                    <td className="border p-2 text-center">
                                                        <button 
                                                            onClick={() => handleRemoveParticipant(participant._id)}
                                                            className="text-red-500 hover:bg-red-100 p-2 rounded"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Close Button */}
                            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                <button
                                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}