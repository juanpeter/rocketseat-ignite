import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from 'react-hook-form';

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

import {
  HomeContainer,
  StartcountdownButton,
  StopcountdownButton,
} from "./styles";
import { CyclesContext } from '../../contexts/CyclesContext';


const newCycleValidatitionSchema = zod.object({
  task: zod.string().min(1, 'Please add a task'),
  minutesAmount:
    zod.number()
      .min(5, 'Cycle must be at least 5 minutes long')
      .max(60, 'Cycle has a maximum of 60 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidatitionSchema>

export function Home() {
  const {
    activeCycle,
    createNewCycle,
    interruptCurrentCycle
  } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidatitionSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, /*reset*/ } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(createNewCycle)}
        action=''>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopcountdownButton
            onClick={interruptCurrentCycle}
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
    </HomeContainer >
  )
}
