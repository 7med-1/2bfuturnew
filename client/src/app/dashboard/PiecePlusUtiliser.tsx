import { useGetDahboardMetricsQuery } from '@/state/api';
import React from 'react';

const PiecePlusUtiliser = () => {
  const { data: dashboardMetrics, isLoading } = useGetDahboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16 ">
      {isLoading ? (
        <div className="m-5"> Loading... </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Pieces plus utiliser
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularPieces.map((piece) => (
              <div
                key={piece.pieceId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <div>img</div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">{piece.name}</div>

                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        {piece.refernece}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex text-lg font-semibold  items-center">
                  {/* <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <Eye className="w-4 h-4" />
                  </button> */}
                  {Math.round(Math.round(piece.quantity) / 10000)} en stock
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PiecePlusUtiliser;
