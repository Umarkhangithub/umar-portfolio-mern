import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactMessage,
  fetchContacts,
} from "../../../../features/contact/contactSlice";
import Pagination from "../../../../components/UI/pagination/Pagination";
import { Trash, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoaderComponents from "../../../../components/UI/Loader/LoaderComponents";
import ProjectListSkeleton from "../../../../components/UI/skeleton/ProjectListSkeleton";

// Memoize the TableRow to avoid re-renders for each contact row
const TableRow = React.memo(({ contact, index, currentPage, deleteContact, handleView }) => (
  <tr key={contact._id} className="hover:bg-gray-50 text-gray-700">
    <td className="px-4 py-2 border">
      {(currentPage - 1) * 5 + index + 1}
    </td>
    <td className="px-4 py-2 border">{contact.name}</td>
    <td className="px-4 py-2 border">{contact.email}</td>
    <td className="px-4 py-2 border">
      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "N/A"}
    </td>
    <td className="px-4 py-2 border text-center">
      <div className="flex justify-center items-center gap-3">
        <button
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          title="View"
          onClick={() => handleView(contact._id)}
        >
          <Eye size={18} />
        </button>
        <button
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Delete"
          onClick={() => deleteContact(contact._id)}
        >
          <Trash size={18} />
        </button>
      </div>
    </td>
  </tr>
));

const ContactList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts, pagination, loading, error } = useSelector(
    (state) => state.contact
  );

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const fetchContactsData = useCallback(() => {
    dispatch(fetchContacts({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    fetchContactsData();
  }, [fetchContactsData]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pagination?.totalPages && currentPage < pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteContactMessage(id))
        .unwrap()
        .then(() => {
          fetchContactsData();
        })
        .catch((err) => {
          console.error("Failed to delete contact:", err);
        });
    }
  };

  const handleView = (id) => {
    navigate(`/dashboard/contacts/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-950">Contact Messages</h2>

      {/* Loading */}
      {loading && <ProjectListSkeleton rows={5} cols={5} />}

      {/* Error */}
      {error && !loading && (
        <p className="text-red-600 text-center py-4">{error}</p>
      )}

      {!loading && contacts?.length === 0 && <p>No contacts found.</p>}

      {!loading && contacts?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <TableRow
                  key={contact._id}
                  contact={contact}
                  index={index}
                  currentPage={currentPage}
                  deleteContact={deleteContact}
                  handleView={handleView}
                />
              ))}
            </tbody>
          </table>

          <Pagination
            style="text-gray-700"
            currentPage={currentPage}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setCurrentPage}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      )}
    </div>
  );
};

export default ContactList;
