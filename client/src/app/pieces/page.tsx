'use client';
import {
  useCreatePieceMutation,
  useGetPiecesQuery,
  useUpdatePieceMutation,
  useDeletePieceMutation,
} from '@/state/api';
import {
  PlusCircleIcon,
  SearchIcon,
  Trash2Icon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '../(components)/Header';
import CreatePieceModal from './CreatePieceModal';

type PieceFormData = {
  name: string;
  reference: string;
  place: string;
  description: string;
  quantity: number;
};

const Pieces = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: pieces,
    isLoading,
    isError,
  } = useGetPiecesQuery(debouncedSearch);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createPiece] = useCreatePieceMutation();
  const [updatePiece] = useUpdatePieceMutation();
  const [deletePiece] = useDeletePieceMutation();

  const handleCreateProduct = async (pieceData: PieceFormData) => {
    await createPiece(pieceData);
  };

  const handleIncrement = async (pieceId: string, currentQty: number) => {
    await updatePiece({ pieceId, data: { quantity: currentQty + 1 } });
  };

  const handleDecrement = async (pieceId: string, currentQty: number) => {
    if (currentQty > 0) {
      await updatePiece({ pieceId, data: { quantity: currentQty - 1 } });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this piece?')) {
      await deletePiece(id);
    }
  };

  if (isLoading) return <div className="py-4">Loading...</div>;
  if (isError || !pieces)
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch pieces
      </div>
    );

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pieces.map((product) => (
          <div
            key={product.pieceId}
            className="border shadow rounded-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg text-gray-900 font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-800">{product.reference}</p>
              <div className="text-sm text-gray-600 mt-1">
                Stock: {product.quantity}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleDecrement(product.pieceId, product.quantity)
                  }
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    handleIncrement(product.pieceId, product.quantity)
                  }
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handleDelete(product.pieceId)}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CreatePieceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Pieces;
