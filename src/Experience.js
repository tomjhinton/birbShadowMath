import { Text3D, OrbitControls, Center, Plane, Float ,Html} from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree, addEffect } from '@react-three/fiber'

export default function Experience(){

    const { viewport } = useThree()
    
    const ref = useRef()
    const form = useRef()
    const firstO = useRef()
    const symbolO = useRef()
    const secondO = useRef()
    const time = useRef()
    const scoreRef = useRef()



    useFrame(({ mouse }) => {
       
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2
      ref.current.position.set(x, y, 0)
        
    })

    const symbols =['+', '-', '*']

   let [first, setFirst] = useState(1)
   let [second, setSecond] = useState(2)
   let [symbol, setSymbol] = useState('+')

   let [numbers, setNumbers] = useState(9)
   let [spotS, setSpotS] = useState(1.5)

   const [counter, setCounter] = useState(10);
    const [score, setScore] = useState(0);

    const submit = (e) =>{
        e.preventDefault()
       

        if(form.current.value  == eval(first+symbol+second)){
            setCounter(counter + 10)
            setScore(score + 1)
            setNumbers(numbers + 3 )
            setFirst(Math.floor(Math.random()*numbers))
            setSecond(Math.floor(Math.random()*numbers))
            setSymbol(symbols[Math.floor(Math.random()*symbols.length)])

            let offset = Math.floor(Math.random() * 4) *(Math.random() < 0.5 ? -1 : 1)


            firstO.current.position.set(-4 + offset, 0 + offset, 0)
            symbolO.current.position.set(0 + offset, 0 + offset, 0)
            secondO.current.position.set(4 + offset, 0 + offset, 0)

            if(spotS > 1.5){
                setSpotS(spotS -1.)

            }

           
        }

        else if(form.current.value !== eval(first+symbol+second)){
            setScore(0)
            setNumbers(9)
            clearTimeout(timerRef.current);
        timerRef.current = null;
        setCounter(0)
        }
    }

    
    const timerRef = useRef();
    useEffect(() => {
        if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
        if(counter === 0){
            setScore(0)
            setNumbers(9)
        }
        if (counter > 0) {
            timerRef.current = setTimeout(() => setCounter(counter - 1), 1000);
          }
       

      }, [counter]);

    return(

        

        <>
        <Center>
            <Text3D 
            ref={firstO}
            font='./fonts/helvetiker_regular.typeface.json'
            size={2.75}
            height={ 0.2 }
            curveSegments={ 12 }
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={ 0.02 }
            bevelOffset={ 0 }
            bevelSegments={ 5 }
            castShadow
            position={[-4,0,0]}
            >
            <meshStandardMaterial
            transparent
            opacity={0.}/>
                
               {first}

            </Text3D>

            <Text3D 
            ref={symbolO}
            font='./fonts/helvetiker_regular.typeface.json'
            size={2.75}
            height={ 0.2 }
            curveSegments={ 12 }
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={ 0.02 }
            bevelOffset={ 0 }
            bevelSegments={ 5 }
            castShadow
            position={[0,0,0]}
            >
            <meshStandardMaterial
            transparent
            opacity={0.}/>
                
               {symbol}

            </Text3D>


            <Text3D 
            ref={secondO}
            font='./fonts/helvetiker_regular.typeface.json'
            size={2.75}
            height={ 0.2 }
            curveSegments={ 12 }
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={ 0.02 }
            bevelOffset={ 0 }
            bevelSegments={ 5 }
            castShadow
            position={[4,0,0]}
            >
            <meshStandardMaterial
            transparent
            opacity={0.}/>
                
               {second}

            </Text3D>

            <Text3D 
            ref={scoreRef}
            font='./fonts/helvetiker_regular.typeface.json'
            size={1}
            height={ 0.2 }
            curveSegments={ 12 }
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={ 0.02 }
            bevelOffset={ 0 }
            bevelSegments={ 5 }
            castShadow
            position={[12,5, 0 ]}
            >
            <meshBasicMaterial
          />
                
                Score : {score}

            </Text3D>

            <Text3D 
            ref={time}
            font='./fonts/helvetiker_regular.typeface.json'
            size={1}
            height={ 0.2 }
            curveSegments={ 12 }
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={ 0.02 }
            bevelOffset={ 0 }
            bevelSegments={ 5 }
            castShadow
            position={[-12,5, 0 ]}
            time={10}
            >
            <meshBasicMaterial
          />
                
                Timer : {counter}

            </Text3D>





            <mesh receiveShadow  position={[0,0,0]}>
            <planeGeometry args={[50,50]}/>
            <meshStandardMaterial/>
            </mesh>
            <Float>
                <Html position={[0, -4,0]}>
                <form onSubmit={submit}>
                <input ref={form} type="number"></input>
                </form>
                </Html>
            </Float>
            

            </Center>
            <pointLight color="blue" ref={ref}

            castShadow
            // position={ [ 4, 4, 1 ] }
            intensity={ spotS }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        />

        {/* <Html  position={[-12,5, 0 ]}>
        <div ref={time} className="time">
              Time:  {counter}
            </div>
        </Html>
        <Html position={[12,5, 0 ]}>
        <div ref={scoreRef} className="score">
            Score:    {score}
            </div>
        </Html> */}
        </>
    )
}