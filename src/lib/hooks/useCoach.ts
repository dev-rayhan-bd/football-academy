import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { updateCoachField, CoachData } from "../features/coach/coachSlice";
import { useUpdateCoachProfileMutation } from "../features/cv/cvApi";
import { toast } from "sonner";

export const useCoach = () => {
  const dispatch = useAppDispatch();
  const coachData = useAppSelector((state) => state.coach);
  const [updateCoachProfile] = useUpdateCoachProfileMutation();

  const handleUpdate = async (field: string, value: any) => {
    // Optimistic update in Redux
    dispatch(updateCoachField({ field, value }));

    try {
      // API call
      await updateCoachProfile({ id: "current-coach", data: { [field]: value } }).unwrap();
      toast.success(`${field} updated successfully`);
    } catch (error) {
      // Rollback if necessary or just show error
      console.error(error);
    }
  };

  return {
    coachData,
    handleUpdate,
  };
};
