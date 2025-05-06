import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactById } from "../../../../features/contact/contactSlice"; // Update path as needed

const ContactDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { contact, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    if (id) {
      dispatch(fetchContactById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading contact details...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={() => navigate("/dashboard/contacts")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Contact List
        </button>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6 text-gray-700">
        <p>Contact not found or data not loaded.</p>
        <button
          onClick={() => navigate("/dashboard/contacts")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Contact List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Detail</h2>
      <div className="space-y-3 text-gray-700">
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Message:</strong> {contact.message}</p>
        <p><strong>Date:</strong> {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "N/A"}</p>
      </div>
      <button
        onClick={() => navigate("/dashboard/contacts")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Contact List
      </button>
    </div>
  );
};

export default ContactDetail;
