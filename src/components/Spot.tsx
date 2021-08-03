import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "lib/useAppDispatch";
import { SpotData } from "lib/utils";
import { clickSpot, endSuspend, startSuspend } from "store/game.actions";
import { getGameStateSelector } from "store/game.selectors";

const Spot: React.VFC<SpotData> = (data) => {
  const dispatch = useAppDispatch();

  const gameState = useSelector(getGameStateSelector);
  const [className, setClassName] = useState<string[]>([]);

  useEffect(() => {
    setClassName([]);
  }, [gameState === "ended"]);

  const getClassName = () => {
    const getClassNameArray = () => {
      if (data.state == "clicked") {
        if (data.hasBomb) {
          return [...className, "flower_red"];
        } else {
          const cn = ["empty"];
          if (data.nextBombCount > 0) {
            cn.push("count_" + data.nextBombCount);
          }
          return [...className, ...cn];
        }
      } else {
        if (gameState === "ended" && data.hasBomb) {
          return ["flower"];
        }
        return className;
      }
    };
    return getClassNameArray().join(" ");
  };

  const { leftSuspendEnd, leftSuspendStart } = useCallback(
    () => ({
      leftSuspendEnd: () => {
        if (gameState !== "suspended") return;
        dispatch(endSuspend(data)).then(
          (data) => data.payload && setClassName([])
        );
      },
      leftSuspendStart: () => {
        dispatch(startSuspend(data)).then(
          (data) => data.payload && setClassName(["empty"])
        );
      }
    }),
    [className, dispatch, gameState]
  )();

  const tdClassName = getClassName();

  return useMemo(() => {
    return (
      <td
        className={tdClassName}
        onClick={() => dispatch(clickSpot(data))}
        onMouseDown={leftSuspendStart}
        onMouseOut={leftSuspendEnd}
        onMouseUp={leftSuspendEnd}
      />
    );
  }, [className, leftSuspendStart, leftSuspendEnd]);
};

export default Spot;
