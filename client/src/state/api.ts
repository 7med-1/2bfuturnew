import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// === Types ===
export interface Pieces {
  pieceId: string;
  name: string;
  reference: string;
  place: string;
  description: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewPieces {
  name: string;
  reference: string;
  place: string;
  description: string;
  quantity: number;
}

export interface PiecesSummery {
  pSummeryId: string;
  date: string;
  quantity: number;
}

export interface DashboardMetrics {
  recentAdded: Pieces[];
  recentUpdated: Pieces[];
  popularPieces: Pieces[];
  piecesSummery: PiecesSummery[];
}

// === API Slice ===
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g. http://localhost:5000/api
  }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics', 'Pieces'],
  endpoints: (build) => ({
    // 📊 Dashboard
    getDahboardMetrics: build.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),

    // 📦 Get all pieces
    getPieces: build.query<Pieces[], string | void>({
      query: (search) => ({
        url: '/pieces',
        params: search ? { search } : {},
      }),
      providesTags: ['Pieces'],
    }),

    // ➕ Create piece
    createPiece: build.mutation<Pieces, NewPieces>({
      query: (newPiece) => ({
        url: '/pieces',
        method: 'POST',
        body: newPiece,
      }),
      invalidatesTags: ['Pieces'],
    }),

    // ✏️ Update piece
    updatePiece: build.mutation<Pieces, { pieceId: string; data: Partial<NewPieces> }>({
      query: ({ pieceId, data }) => ({
        url: `/pieces/${pieceId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Pieces'],
    }),

    // 🗑️ Delete piece
    deletePiece: build.mutation<{ message: string }, string>({
      query: (pieceId) => ({
        url: `/pieces/${pieceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pieces'],
    }),

    // ➖ Take (decrement quantity)
    takePiece: build.mutation<Pieces, { pieceId: string; amount?: number }>({
      query: ({ pieceId, amount }) => ({
        url: `/pieces/${pieceId}/take`,
        method: 'PATCH',
        body: { amount },
      }),
      invalidatesTags: ['Pieces'],
    }),
  }),
});

// === Hooks ===
export const {
  useGetDahboardMetricsQuery,
  useGetPiecesQuery,
  useCreatePieceMutation,
  useUpdatePieceMutation,
  useDeletePieceMutation,
  useTakePieceMutation,
} = api;
