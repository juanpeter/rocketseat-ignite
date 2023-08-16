import { useFormContext } from 'react-hook-form'

import {
  FormContainer,
  MinutesamountInput,
  TaskInput
} from "./styles"
import { useContext } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {

  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (

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
  )
}