import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesamountInput,
  Separator,
  StartcountdownButton,
  TaskInput
} from "./styles";

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

export function Home() {

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidatitionSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
    reset()
  }

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
            {...register('task')}
          />
          <datalist id="taskSuggestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesamountInput placeholder="00"
            step={5}
            min={5}
            // max={60}
            type="number"
            id="minutesAmount"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartcountdownButton
          disabled={isSubmitDisabled}
          type="submit" >
          <Play size={24} />
          Começar
        </StartcountdownButton>

      </form>
    </HomeContainer>
  )
}
