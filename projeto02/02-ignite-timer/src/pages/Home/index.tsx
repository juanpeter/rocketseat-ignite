import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from "date-fns";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesamountInput,
  Separator,
  StartcountdownButton,
  StopcountdownButton,
  TaskInput
} from "./styles";
import { useEffect, useState } from "react";

const newCycleValidatitionSchema = zod.object({
  task: zod.string().min(1, 'Please add a task'),
  minutesAmount:
    zod.number()
      .min(5)
      .max(60),
})

// It's is reccomended to use "type" when creating an interface from another var
// Using typeof means you are referecing a js var in ts as a type
type NewCycleFormData = zod.infer<typeof newCycleValidatitionSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidatitionSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {

    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }

  }, [activeCycle])


  function handleCreateNewCycle(data: any) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    // TO-DO: Closure data, I did not understand the concept completely tbh
    // State is used to access previous data saved in a component
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  // Stringfies minutes/secondsAmount, then adds 0 if the string lenght is < 2
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`
    }
  }, [minutes, seconds])

  const task = watch('task')
  // Helper var, can look redundant but helps code reading
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormContainer>
          <label htmlFor="task">I'll be working on</label>
          <TaskInput
            placeholder="Your project name"
            list="taskSuggestions"
            id="task"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="taskSuggestions">
            <option value="project 1" />
            <option value="project 2" />
            <option value="project 3" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesamountInput placeholder="00"
            step={5}
            min={5}
            max={60}
            type="number"
            id="minutesAmount"
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopcountdownButton
            onClick={handleInterruptCycle}
            type="button" >
            <HandPalm size={24} />
            Stop
          </StopcountdownButton>
        ) : (
          <StartcountdownButton
            disabled={isSubmitDisabled}
            type="submit" >
            <Play size={24} />
            Start
          </StartcountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
