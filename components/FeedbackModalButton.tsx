"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeedbackModalButton({
  interviewId,
  users,
}: {
  interviewId?: string;
  users?: User[];
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setShowModal(true);
  };

  return (
    <>
      <Button className="btn-primary" onClick={handleClick}>
        Check Feedback
      </Button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-light-900 border border-light-700 shadow-2xl rounded-2xl p-8 min-w-[340px] max-w-[95vw] flex flex-col items-center animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-primary-200 tracking-wide flex items-center gap-2">
              Users who have taken this interview
            </h2>
            <div className="mb-6 w-full flex flex-col gap-3">
              {users?.length === 0 ? (
                <div className="text-center text-gray-400 py-4 bg-light-800 rounded-lg">
                  No users have taken this interview yet.
                </div>
              ) : (
                users?.map((user) => (
                  <div key={user.id} className="w-full">
                    <Link
                      href={`/interview/${interviewId}/feedback?userId=${user.id}`}
                      passHref
                      legacyBehavior
                    >
                      <Button className="w-full btn-primary text-base font-semibold py-2 rounded-lg transition-all duration-150 hover:bg-primary-200/90">
                        {user.name}
                      </Button>
                    </Link>
                  </div>
                ))
              )}
            </div>
            <Button
              className="btn-outline w-1/2 py-2 rounded-lg text-base font-semibold mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
