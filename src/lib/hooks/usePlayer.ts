import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { updatePlayerField, setSelectedPlayerId, validatePlayerCv, PlayerData } from "../features/player/playerSlice";
import { useUpdatePlayerProfileMutation } from "../features/cv/cvApi";
import { toast } from "sonner";

export const usePlayer = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.player.players);
  const selectedPlayerId = useAppSelector((state) => state.player.selectedPlayerId);
  const playerData = players.find((p) => p.id === selectedPlayerId) || players[0];
  const [updatePlayerProfile] = useUpdatePlayerProfileMutation();

  const handleUpdate = async (field: string, value: any) => {
    // Optimistic update in Redux
    dispatch(updatePlayerField({ field, value }));

    try {
      // API call
      await updatePlayerProfile({ id: String(selectedPlayerId), data: { [field]: value } }).unwrap();
      toast.success(`${field} updated successfully`);
    } catch (error) {
      // Rollback if necessary or just show error
      // toast.error(`Failed to update ${field}`);
      console.error(error);
    }
  };

  const selectPlayer = (id: number) => {
    dispatch(setSelectedPlayerId(id));
  };

  const validatePlayer = (id: number) => {
    dispatch(validatePlayerCv(id));
    toast.success("Player CV successfully validated");
  };

  return {
    playerData,
    players,
    selectedPlayerId,
    handleUpdate,
    selectPlayer,
    validatePlayer,
  };
};

