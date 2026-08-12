import soundSuccess from '@/assets/sounds/success.mp3'
import soundError from '@/assets/sounds/error.mp3'
import { useSound } from 'use-sound'
import { useDevices, Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStudentAssistence } from '@/hooks/API/use-student-assistence'

export const CameraQr = () => {
  const devices = useDevices()
  const { createAssistence } = useStudentAssistence()
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | undefined>(devices[0])

  const [playSuccess] = useSound(soundSuccess)
  const [playError] = useSound(soundError)

  const onScanQR = async (payload: IDetectedBarcode[]) => {
    const [result] = payload
    if (result) {
      try {
        await createAssistence({
          studentId: result.rawValue,
          date: new Date(),
          assistence: true
        })

        playSuccess()
      } catch (error) {
        console.warn(error)
        playError()
      }
    }
  }

  return (
    <div className='flex items-center gap-4 flex-col'>
      <Select
        value={selectedDevice?.deviceId || ''}
        onValueChange={(value) =>
          setSelectedDevice(devices.find((d) => d.deviceId === value))
        }
      >
        <SelectTrigger className='w-70'>
          <SelectValue placeholder='Select a camera' />
        </SelectTrigger>
        <SelectContent>
          {devices.map((device) => (
            <SelectItem key={`${device.deviceId}`} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Scanner
        onScan={onScanQR}
        constraints={{
          deviceId: selectedDevice?.deviceId,
          sampleSize: {
            ideal: 1920
          },
        }}
      />
    </div>
  )
}