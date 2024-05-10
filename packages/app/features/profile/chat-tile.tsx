import { SolitoImage } from "solito/image";
import { Row } from "../../design/layout";
import { View } from "../../design/view";
import { P } from "../../design/typography";
import { Feather } from "@expo/vector-icons";

export function ChatTile({chat}) {
    return (
<>
                    <Row key={chat.ref} className='justify-between items-center m-3'>
                        <Row className='justify-center items-center space-x-4'>
                            <View className='relative w-16 h-16'>
                                <SolitoImage 
                                    src={chat.user_b.photo_url} 
                                    fill
                                    style={{
                                        borderRadius: 180
                                    }}  
                                    />
                            </View>
                            <View>
                                <P>{chat.user_b.display_name}</P>
                                <P className='text-gray-500'>{chat.last_message}</P>
                            </View>
                        </Row>
                        <Feather name="arrow-right" size={24} color="black" />
                    </Row>
                    <View className='bg-gray-300 h-[2px] m-2' />
                    </>
    )
}