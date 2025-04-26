import Image from 'next/image'

enum CallStatus{
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
    CONNECTING='CONNECTING',
}

const Agent = ({userName}:AgentProps) => {
    const isSpeaking = true; // Replace with your actual logic to determine if the agent is speaking
  return (
    <>
        <div className='call-view'>
            <div className='card-interviewer'>
                <div className='avatar'>
                    <Image src="/ai-avatar.png" alt="Vapi" width={65} height={55} className='object-cover' />
                    {isSpeaking && <span className='animate-speak'/>}
                </div>
                <h3>AI Interviewer</h3>
            </div>
            <div className='card-border'>
                    <div className='card-content'>
                        <Image src="/user-avatar.png" alt="user avatar" width={565} height={555} className='rounded-cover object-cover size-[120px]' />
                        <h3>{userName}</h3>
                    </div>
            </div>
        </div>
        <div className='w-full flex justify-center'>
            {callStatus !== 'Active' ? (
                <button>
                    <span>
                        {CallStatus === 'INACTIVE'|| CallStatus === 'FINISHED' ? 'Call':'. . .'}
                    </span>
                </button>
            )}
        </div>
    </>    
  )
}

export default Agent;