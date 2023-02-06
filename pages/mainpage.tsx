import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Textarea, Col, Container, Row } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from 'react';
import { Loading, Text, Input, useInput, Spacer } from "@nextui-org/react";
import { MuiColorInput } from 'mui-color-input'
import Slider from '@mui/material/Slider';
type NormalColors =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';


export default function Mainpage() {
    let setstatuscolors: NormalColors = "default";
    const [color, setColor] = React.useState('#ffffff')
    const handleChange = (color: any) => {
        setColor(color)
      }    
    let [setstatuscolor,toSuccess] = React.useState<NormalColors>(setstatuscolors)
    let [numSlides, setNumSlides] = React.useState<number>(7);
    let [keywords , setKeywords] = React.useState<any>("")
    let [topics, setTopics] = React.useState<any>("")
    let [keydesc, keysetDesc] = React.useState<string>("Optional")
    let [title, setTitle] = React.useState<any>("")
    let [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
          setNumSlides(newValue as number);
      };
    
     const {
        value: controlledValue,
        setValue: setControlledValue,
        reset,
        bindings,
      } = useInput("");
    return (

        <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <Col>
            <Container justify='center' sm>
            <Row justify='center'>
            <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        Hello User
      </Text> 
          </Row>
          <Text h3>Title</Text>
          <Input
          clearable
          placeholder="Enter a Title"
          fullWidth = {true}
          size = "xl"
          status = {setstatuscolor}
          value = {title}
          onChange = {(text) => setTitle(title = text.target.value)}
        />
          <Spacer y = {2.5}/>

          <Text h3>Select the number of Slides</Text>
          <Slider value={numSlides} aria-label="Default" valueLabelDisplay="auto" max= {25}  onChange={handleSliderChange}/>
          <Spacer y = {2.5}/>


          <Text h3>Topics</Text>
          <Textarea fullWidth={true} placeholder='Enter your topics'{...bindings} status = {setstatuscolor} minRows={8}
          maxRows={15} width = {"xl"} size = "xl"
          value={topics}
          onChange = {(text) => {setTopics(topics = text.target.value)}}
          />
          <Spacer y = {2.5}/>


          <Text h3>Keywords</Text>
          <Input
          clearable
          placeholder="Please enter relevant Keywords"
          fullWidth = {true}
          size = "xl"
          status = {setstatuscolor}
          value = {keywords}
          onChange = {(text) => setKeywords(keywords = text.target.value)}
        />
        <Spacer y = {4}/>
        <Row justify='center'>
          <Button
                auto
                color="gradient"
                size="xl"
                shadow
                onPress={async () => {
                    toSuccess(
                        setstatuscolor = "success"
                        ); 
                        setButtonLoading(true);

                    
                    keysetDesc(keydesc = "Great Keywords")
                    let res = await fetch('/api/generate?' + new URLSearchParams({
                        title,
                        topics,
                        keywords,
                        nslides: numSlides+"",
                    }).toString(), {});
                    const {link} = await res.json();
                    setButtonLoading(false);
                    window.open(link, '_blank');
                }}
              > {buttonLoading ? 
                <Loading type="points" color="currentColor" size="xl" />
               : 
               <Text>Generate Results</Text>
              } </Button>  </Row>   
              </Container>
              </Col>  
        </main>
      </>
    )
}