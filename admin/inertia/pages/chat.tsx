import { Head } from '@inertiajs/react'
import ChatComponent from '~/components/chat'
import { useAssistantName } from '~/lib/assistant_name'

export default function Chat(props: { settings: { chatSuggestionsEnabled: boolean } }) {
  const aiAssistantName = useAssistantName()
  return (
    <div className="w-full h-full">
      <Head title={aiAssistantName} />
      <ChatComponent enabled={true} suggestionsEnabled={props.settings.chatSuggestionsEnabled} />
    </div>
  )
}
