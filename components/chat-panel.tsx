import { type UseChatHelpers } from 'ai/react'
import { kv } from '@vercel/kv'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop, IconMessage } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { getResult1 } from '@/app/api/chat/route'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

import { Chat } from './chat'
//import { getResult1 } from '@/app/api/chat/route'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "You are administering a survey. Always provide the result number if available. Ask this question and do not include additional instructions \"Question 1: Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-1" />
            1
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions \"Question 2: Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            2
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions \"Question 3: Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            3
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "ask this question and do not include additional instructions \"Question 4: Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            4
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions \"Question 5: Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            5
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions \"Question 6: Over the last 2 weeks, how often have you been bothered by feeling bad about yourself--or that you are a failure or have let yourself or your family down?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            6
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions \"Question 7: Over the last 2 weeks, how often have you been bothered by having trouble concentrating on things, such as reading the newspaper or watching television?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            7
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions \"Question 8: Over the last 2 weeks, how often have you been bothered by yourself moving or speaking so slowly that other peopl could have noticed--or the opposite--being so fidgety or restless that you have been moving around a lot more that usual?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            8
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "Ask this question and do not include additional instructions or options \"Question 9: Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead, or of hurting yourself?\".",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            9
          </Button>
          <Button
          size="wideIcon"
            variant="outline"
            onClick={async value => {
              await append({
                id,
                content: "List the results numbers for questions 1-9. Use the sum of those numbers to categorize depression severity according to these ranges. 1-4: minimal depression, 5-9: mild depression, 10-14: moderate depression, 15-19: moderately severe depression, 20-27: severe depression.",
                role: 'system'
              })
            }}
            className="bg-background"
            >
            <IconMessage className="mr-2" />
            Done
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
