import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import CopyInterviewLink from "./CopyInterviewLink";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import {
  getFeedbackByInterviewId,
  getAllUsers,
  getFeedback,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import FeedbackModalButton from "./FeedbackModalButton";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const user = await getCurrentUser();
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const feedbackByInterviewId =
    userId && interviewId
      ? await getFeedback({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  let interviewTakenByUsers;
  if (interviewId) {
    interviewTakenByUsers = await getAllUsers(interviewId);
  }

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text ">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <div className="flex flex-row justify-between items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={90}
              height={90}
              className="rounded-full object-fit size-[90px]"
            />
            <CopyInterviewLink interviewId={interviewId} />
          </div>
          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            {user?.role !== "admin" && (
              <div className="flex flex-row gap-2 items-center">
                <Image src="/star.svg" width={22} height={22} alt="star" />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            )}
          </div>

          {/* Feedback or Placeholder Text */}
          {user?.role !== "admin" && (
            <p className="line-clamp-2 mt-5">
              {feedback?.finalAssessment
                ? "Your interview is completed. If selected, we will get back to you shortly. All the best!"
                : "You haven't taken this interview yet. Take it now."}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <DisplayTechIcons techStack={techstack} />

          {/* Copy link icon */}

          {/* Admin: Show Check Feedback if feedback exists, else show 'Interview yet to be taken' */}
          {user?.role === "admin" &&
            (feedbackByInterviewId ? (
              <FeedbackModalButton
                users={interviewTakenByUsers}
                interviewId={interviewId}
              />
            ) : (
              <div className="flex items-center px-4 py-2 text-gray-500 border rounded-lg bg-light-200">
                Interview yet to be taken
              </div>
            ))}

          {/* Non-admin: Show View Interview if feedback does not exist, else show 'Interview Taken' */}
          {user?.role !== "admin" &&
            (!feedback ? (
              <Button className="btn-primary">
                <Link href={`/interview/${interviewId}`}>Take Interview</Link>
              </Button>
            ) : (
              <div className="flex items-center px-4 py-2 text-green-600 border rounded-lg bg-light-200">
                Interview Taken
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
