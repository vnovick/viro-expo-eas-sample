import {useEffect, useState} from 'react'
import {Text, View} from '../../components/Themed'
import {ViroARScene} from '@viro-community/react-viro/components/AR/ViroARScene'
import {ViroBox} from '@viro-community/react-viro/components/ViroBox'
import {Viro3DObject} from '@viro-community/react-viro/components/Viro3DObject'
import {ViroARImageMarker} from '@viro-community/react-viro/components/AR/ViroARImageMarker'
import {ViroTrackingStateConstants} from '@viro-community/react-viro/components/ViroConstants'
import {ViroARPlaneSelector} from '@viro-community/react-viro/components/AR/ViroARPlaneSelector'
import {ViroButton} from '@viro-community/react-viro/components/ViroButton'
import {ViroFlexView} from '@viro-community/react-viro/components/ViroFlexView'
import {ViroVideo} from '@viro-community/react-viro/components/ViroVideo'
import {ViroAnimations} from '@viro-community/react-viro/components/Animation/ViroAnimations'
import {ViroMaterials} from '@viro-community/react-viro/components/Material/ViroMaterials'
import {ViroNode} from '@viro-community/react-viro/components/ViroNode'
import {ViroDirectionalLight} from '@viro-community/react-viro/components/ViroDirectionalLight'
import {ViroText} from '@viro-community/react-viro/components/ViroText'
import {ViroImage} from '@viro-community/react-viro/components/ViroImage'
import {ViroARTrackingTargets} from '@viro-community/react-viro/components/AR/ViroARTrackingTargets'
import {ViroQuad} from '@viro-community/react-viro/components/ViroQuad'
import {StyleSheet} from 'react-native'

type SceneContentProps = {
  displaySurfaceDetection: boolean
  displayImageOrVideo: boolean
}

const SceneContent = ({
  displaySurfaceDetection,
  displayImageOrVideo,
}: SceneContentProps) => (
  <>
    <ViroNode>
      {/*use transformBehaviors={['billboard']} to Position always facing the camera */}
      <ViroARImageMarker target={'targetOne'}>
        <Viro3DObject
          source={{
            uri: 'https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Duck/glTF-Binary/Duck.glb',
          }}
          scale={[0.1, 0.1, 0.1]}
          position={[0, -0.3, 0]}
          highAccuracyEvents={true}
          type='GLB'
        />
      </ViroARImageMarker>
    </ViroNode>
    {displayImageOrVideo ? (
      <>
        <ViroNode
          position={[0, 0.2, -1]}
          animation={{
            name: 'loopRotate',
            run: true,
            interruptible: true,
            loop: true,
          }}
        >
          <ViroImage
            height={0.5}
            width={0.5}
            rotation={[0, 180, 0]}
            position={[0, 0, -0.04]}
            source={{
              uri: 'https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png',
            }}
          />
          <ViroBox
            width={5}
            height={5}
            scale={[0.1, 0.1, 0.02]}
            position={[0, 0, -0.02]}
          />
          <ViroImage
            height={0.5}
            width={0.5}
            source={{
              uri: 'https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png',
            }}
          />
        </ViroNode>
      </>
    ) : null}
    {displaySurfaceDetection ? (
      <ViroARPlaneSelector alignment='Horizontal'>
        <Viro3DObject
          source={{
            uri: 'https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Duck/glTF-Binary/Duck.glb',
          }}
          scale={[0.1, 0.1, 0.1]}
          highAccuracyEvents={true}
          rotation={[0, 0, 0]}
          type='GLB'
        />
        <ViroQuad
          position={[0, 0, 0]}
          rotation={[-90, 0, 0]}
          width={20}
          height={20}
          {...({
            // Not Typed
            arShadowReceiver: true,
          } as any)}
        />
        <ViroQuad
          position={[0, 0, 0]}
          rotation={[-90, 0, 0]}
          width={20}
          height={20}
          {...({
            // Not Typed
            arShadowReceiver: true,
          } as any)}
        />
      </ViroARPlaneSelector>
    ) : null}
  </>
)

export const ARScene = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const [displayPointCloud, setDisplayPointCloud] = useState(false)
  const [displaySurfaceDetection, setDisplaySurfaceDetection] = useState(false)
  const [displayImageOrVideo, setDisplayImageOrVideo] = useState(false)

  useEffect(() => {
    ViroARTrackingTargets.createTargets({
      targetOne: {
        source: {
          uri: 'https://boofcv.org/images/thumb/3/35/Example_rendered_qrcode.png/400px-Example_rendered_qrcode.png',
        },
        orientation: 'Up',
        physicalWidth: 0.05, // real world width in meters
      },
    })
  }, [])

  const onInitialized = (state: ViroTrackingStateConstants) => {
    if (state == ViroTrackingStateConstants.TRACKING_NORMAL) {
      setIsTracking(true)
      setInitializing(true)
    } else if (state == ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setIsTracking(false)
    }
  }

  return (
    <ViroARScene
      onTrackingUpdated={onInitialized}
      displayPointCloud={
        displayPointCloud
          ? {
              imageSource: {
                uri: 'https://img.favpng.com/18/3/22/angle-point-black-and-white-pattern-png-favpng-rntkp6RiRdXEW7u8uMZnG715g_t.jpg',
              },
              imageScale: [0.005, 0.005, 0.005],
              maxPoints: 100,
            }
          : undefined
      }
    >
      <ViroDirectionalLight
        color='#ffffff'
        direction={[0, -1, 0]}
        shadowOrthographicPosition={[0, 3, -5]}
        shadowOrthographicSize={10}
        shadowNearZ={2}
        shadowFarZ={9}
        castsShadow={true}
      />
      {isTracking ? (
        <SceneContent
          {...{
            displaySurfaceDetection,
            displayImageOrVideo,
          }}
        />
      ) : (
        <ViroText
          width={5}
          text={initializing ? 'Initializing...' : 'Not Tracking'}
          scale={[0.1, 0.1, 0.1]}
          position={[0, 0, -1]}
          style={styles.textStyle}
          transformBehaviors={['billboardX', 'billboardY']}
        />
      )}
      {!displayImageOrVideo ? (
        <>
          <ViroNode position={[4, 1, -4.5]} rotation={[0, -25, 0]}>
            <ViroButton
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/07/25/07/59/the-button-859346_1280.png',
              }}
              height={2}
              width={3}
              onClick={() => setDisplayPointCloud(!displayPointCloud)}
            />
            <ViroText
              text='Display Point Cloud'
              width={3}
              position={[0.7, -0.3, 0.2]}
            />
          </ViroNode>
          <ViroNode position={[0, 1, -5]}>
            <ViroButton
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/07/25/07/59/the-button-859346_1280.png',
              }}
              height={2}
              width={3}
              onClick={() =>
                setDisplaySurfaceDetection(!displaySurfaceDetection)
              }
            />
            <ViroText
              text='Display Plane Detector'
              width={3}
              position={[0.7, -0.3, 0.2]}
            />
          </ViroNode>
          <ViroNode position={[-4, 1, -4.5]} rotation={[0, 25, 0]}>
            <ViroButton
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/07/25/07/59/the-button-859346_1280.png',
              }}
              height={2}
              width={3}
              onClick={() => setDisplayImageOrVideo(true)}
            />
            <ViroText
              text='Show Image or Video UI'
              width={3}
              position={[0.7, -0.3, 0.2]}
            />
          </ViroNode>
        </>
      ) : (
        <ViroNode position={[-4, 1, -4.5]} rotation={[0, 25, 0]}>
          <ViroButton
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/07/25/07/59/the-button-859346_1280.png',
            }}
            height={2}
            width={3}
            onClick={() => setDisplayImageOrVideo(false)}
          />
          <ViroText text='Go Back' width={3} position={[0.7, -0.3, 0.2]} />
        </ViroNode>
      )}
    </ViroARScene>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 64,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})

ViroAnimations.registerAnimations({
  loopRotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 3000,
  },
  rotate: {
    properties: {
      rotateZ: '+=90',
    },
    duration: 1000,
  },
})

ViroMaterials.createMaterials({
  grid: {
    diffuseColor: 'rgba(0,0,0,0)',
  },
})
