'use client';

import React, {  FormEvent, useState } from 'react';
import { v4 } from 'uuid';
import Header from '@/app/(components)/Header';

type ProductFormData = {
  name: string;
  reference: string;
  quantity: number;
  description: string;
  place: string;
};

type CreatePieceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreatePieceModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreatePieceModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: '',
    reference: '',
    quantity: 0,
    place: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'quantity' ? (value === '' ? '' : Number(value)) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyles =
    'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="name" className={labelCssStyles}>
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* REFERENCE */}
          <label htmlFor="reference" className={labelCssStyles}>
            Reference
          </label>
          <input
            id="reference"
            type="text"
            name="reference"
            placeholder="Reference"
            onChange={handleChange}
            value={formData.reference}
            className={inputCssStyles}
            required
          />

          {/* DESCRIPTION */}
          <label htmlFor="description" className={labelCssStyles}>
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className={inputCssStyles}
            required
          />

          {/* PLACE */}
          <label htmlFor="place" className={labelCssStyles}>
            Place
          </label>
          <input
            id="place"
            type="text"
            name="place"
            placeholder="Place"
            onChange={handleChange}
            value={formData.place}
            className={inputCssStyles}
            required
          />

          {/* QUANTITY */}
          <label htmlFor="quantity" className={labelCssStyles}>
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            value={formData.quantity}
            className={inputCssStyles}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePieceModal;
