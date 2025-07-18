
"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Mic, HeartPulse, User as UserIcon, Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { voiceEnabledChatbot } from "@/ai/flows/voice-enabled-chatbot";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';


type Message = {
  role: "user" | "assistant";
  content: string;
};

// Component to render markdown content from the AI
const AssistantMessageContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-headings:text-primary prose-p:my-2 prose-ul:my-2 prose-li:my-1">
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => {
            const isYoutubeLink = props.href?.includes('youtube.com/watch?v=');
            if (isYoutubeLink) {
              const videoId = props.href?.split('v=')[1];
              return (
                <div className="aspect-video my-4">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )
            }
             // Custom handling for [YOUTUBE](VIDEO_ID) format
            const youtubeMatch = props.children?.[0]?.toString().match(/\[YOUTUBE\]\((.+?)\)/);
            if(youtubeMatch) {
              const videoId = youtubeMatch[1];
              return (
                <div className="aspect-video my-4">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            }
            return <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline" />;
          },
          img: ({ node, ...props }) => (
            <div className="relative aspect-video my-4">
              <Image src={props.src!} alt={props.alt!} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};


export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Load messages from local storage on initial render
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem("chatHistory");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
  }, [messages]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false; // Stop after first result for better UX
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInput("");
      recognitionRef.current.start();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      try {
        const response = await voiceEnabledChatbot({ query: currentInput });
        const assistantMessage: Message = {
          role: "assistant",
          content: response.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        const errorMessage: Message = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please check your API key and try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
             {messages.length === 0 && !isPending && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Welcome to the AI Assistant!</AlertTitle>
                <AlertDescription>
                  You can ask about symptoms, treatments, or general health topics. Your conversation history will be saved here.
                </AlertDescription>
              </Alert>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <HeartPulse className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xl w-fit rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                 {message.role === 'assistant' ? (
                    <AssistantMessageContent content={message.content} />
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <HeartPulse className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg px-4 py-2 bg-muted flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="text"
              placeholder={isRecording ? "Listening..." : "Type your question here..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPending}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant={isRecording ? "destructive" : "outline"}
              onClick={handleMicClick}
              disabled={isPending}
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Use Voice</span>
            </Button>
            <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
