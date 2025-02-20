import { AttendanceSheet } from "@/server/type";
import { HallAttendancesState } from "@/store/atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const AttendanceTable = ({ index }: { index: number }) => {
  const id = `attendance${index}`;
  const router = useRouter();
  const attendances = useRecoilValue(HallAttendancesState);
  const [data, setData] = useState<AttendanceSheet>();
  useEffect(() => {
    const data =
      attendances && attendances.length
        ? attendances
        : JSON.parse(
            window.localStorage.getItem(LOCAL_STORAGE_KEYS.hallAttendances) ||
              "[]"
          );
    console.log(data);
    setData(data[index]);
  }, [attendances, index]);

  if (!data) return <>Not found</>;
  return (
    <ScrollArea className="whitespace-nowrap rounded-md max-sm:mx-2 max-sm:w-screen max-sm:border max-sm:px-2">
      <div className="table-responsive">
        <table className="table-bordered mx-auto table" id={id}>
          <thead>
            <tr>
              <th rowSpan={2} className="border px-4 py-2 text-center">
                S.No
              </th>
              <th rowSpan={1} className="border px-4 py-2 text-center">
                Hall No {data.hallno}
              </th>
              <th rowSpan={2} className="border px-4 py-2 text-center">
                Name
              </th>
              <th rowSpan={2} className="border px-4 py-2 text-center">
                Section
              </th>
              {/* Can display all exams date */}
            </tr>
            <tr>
              <th rowSpan={1} className="border px-4 py-2 text-center">
                Register No
              </th>
              {/* Can display all exams session */}
            </tr>
          </thead>
          <tbody>
            {data.studentData.map((student, ind) => (
              <tr key={`${data.hallno}-${ind}`}>
                <td
                  key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                  className="border px-4 py-2 text-center"
                >
                  {student.sno}
                </td>
                <td
                  key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                  className="border px-4 py-2 text-center"
                >
                  {student.regno}
                </td>
                <td
                  key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                  className="border px-4 py-2 text-center"
                >
                  {student.name}
                </td>
                <td
                  key={`${data.hallno}-${ind}-${data.hallno}-${student.regno}`}
                  className="border px-4 py-2 text-center"
                >
                  {student.section}
                </td>
                {/* Can display all empty cells to allow manual signature */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default AttendanceTable;
