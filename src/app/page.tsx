"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { AppContextProvider } from '@/components/context-provider/app-context-provider';
import BasePromptLayout from '@/examples/basic-prompt-layout/prompt-layout';
import PromptWithColumnMapping from '@/examples/prompt-with-column-mapping/prompt-with-column-mapping';
import LivestreamExampleFinal from '@/examples/livestream-example/final-code';
import LivestreamExample from '@/examples/livestream-example/boilerplate';

const appConfigService = {
  systemMessage: () => {return 'hello'},
  assistantMessagesAction: () => {return undefined},
}

const inputPlaceholder = () => {return 'hello'};

const assistantAction = () => {return undefined};

export default function Home() {
  return (
    <div className={styles.App}>
    <AppContextProvider>
      <LivestreamExampleFinal />
      {/* <LivestreamExample /> */}
    </AppContextProvider>
    </div>
  )
}
