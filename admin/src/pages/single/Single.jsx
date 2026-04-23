import React, { useState, useEffect } from "react";

import Chart from "../../components/chart/Chart";
import DataList from "../../pages/dataList/DataList";
import "./single.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import fieldConfigs from "../../constants/fieldConfigs";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Single() {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [isEditMode, setIsEditMode] = useState(false);
  const queryClient = useQueryClient();
  console.log(
    "end point url....",
    `${process.env.REACT_APP_API_URL}/${path}/${id}`,
  );
  // 1. Fetch the specific record
  const { data: record, loading: isLoading } = useQuery({
    queryKey: [path, id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/${path}/${id}`,
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
    // Prevent fetching if path or id is missing
    enabled: !!path && !!id,
  });

  // 2. Mutation for updating (Edit/Save)
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axios.put(
        `${process.env.REACT_APP_API_URL}/${path}/${id}`,
        updatedData,
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [path, id] });
      queryClient.invalidateQueries({ queryKey: [path] });
      toast.dismiss();
      toast.success(
        (t) => (
          <span className="customToast">
            Record updated successfully!
            <button onClick={() => toast.dismiss(t.id)} className="toastButton">
              OK
            </button>
          </span>
        ),
        {
          duration: Infinity,
        },
      );
      setIsEditMode(false);
    },
    onError: (error) => {
      // 1. Check if the server sent a specific error message
      const serverMessage = error.response?.data?.message;

      // 2. Check if the server sent a string directly (some middlewares do this)
      const serverData =
        typeof error.response?.data === "string" ? error.response.data : null;

      // 3. Fallback to axios default error message or a hardcoded one
      const finalMessage =
        serverMessage ||
        serverData ||
        error.message ||
        "Failed to update record.";

      toast.error(finalMessage);
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: record, // Automatically populates the form when record loads
  });

  // CRITICAL: Update form values when record is loaded from the API
  useEffect(() => {
    if (record) {
      reset(record);
    }
  }, [record, reset]);

  const onSave = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="topSingle">
        <div className="left">
          <form onSubmit={handleSubmit(onSave)}>
            <div className="editButton">
              {isEditMode ? (
                <button type="submit" className="names">
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="names"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any accidental form triggers
                    setIsEditMode(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <h1 className="itemTitle">Information</h1>
            <div className="item">
              <img
                src={`${record?.img ? record?.img : "http://localhost:5001/logo192.png"}`}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">
                  {path === "users"
                    ? record?.username
                    : record?.name || record?.title}
                </h1>

                {!record ? (
                  <div className="noData">No record found.</div>
                ) : (
                  fieldConfigs[path]?.map((field) => (
                    <div className="detailItem" key={field.key}>
                      <span className="itemKey">{field.label}:</span>
                      {isEditMode ? (
                        <input {...register(field.key)} className="editInput" />
                      ) : (
                        <span className="itemValue">
                          {record?.[field.key] || "N/A"}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="right">
          <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
        </div>
      </div>
      <div className="bottom">
        <h1 className="title1">Last Transactions</h1>
        <DataList />
      </div>
    </>
  );
}

export default Single;
