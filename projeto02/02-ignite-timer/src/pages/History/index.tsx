import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {

  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>History</h1>

      <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task Name</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task Name</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="yellow">Paused</Status>
              </td>
            </tr>
            <tr>
              <td>Task Name</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="red">Interrupted</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
