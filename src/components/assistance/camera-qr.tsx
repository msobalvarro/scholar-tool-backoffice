import soundSuccess from '@/assets/sounds/success.mp3'
import { useDevices, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const CameraQr = () => {
  const devices = useDevices()
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | undefined>(devices[0])

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
        onScan={(result) => console.log(result)}
        classNames={{
          container: 'size-[640px]',
        }}
        components={{
          // audio: true, // Play beep sound on scan
          onOff: true, // Show camera on/off button
          torch: true, // Show torch/flashlight button (if supported)
          zoom: false, // Show zoom control (if supported)
          finder: true, // Show finder overlay
        }}
        constraints={{
          deviceId: selectedDevice?.deviceId,
          width: {
            exact: 640
          },
          height: {
            exact: 640,
          },
          frameRate: {
            exact: 30
          },
          facingMode: "environment"
        }}
        sound={soundSuccess}
      />
    </div>
  )
}