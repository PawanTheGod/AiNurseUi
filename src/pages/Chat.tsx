import { useState } from "react";
import { Send, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatConversations, ChatConversation } from "@/data/mockData";
import { cn } from "@/lib/utils";

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: ChatConversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <div
          key={conv.patientId}
          onClick={() => onSelect(conv.patientId)}
          className={cn(
            "flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-all duration-200",
            selectedId === conv.patientId
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={cn(
                selectedId === conv.patientId
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              {conv.patientName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm truncate">{conv.patientName}</p>
              <span
                className={cn(
                  "text-xs",
                  selectedId === conv.patientId
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {conv.lastMessageTime}
              </span>
            </div>
            <p
              className={cn(
                "text-xs truncate",
                selectedId === conv.patientId
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              )}
            >
              {conv.lastMessage}
            </p>
          </div>
          {conv.unreadCount > 0 && (
            <Badge
              className={cn(
                "h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs",
                selectedId === conv.patientId
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {conv.unreadCount}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}

function ChatView({ conversation }: { conversation: ChatConversation | null }) {
  const [message, setMessage] = useState("");

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {conversation.patientName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{conversation.patientName}</p>
            <p className="text-xs text-muted-foreground">Patient</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.senderType === "doctor" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg px-4 py-2",
                  msg.senderType === "doctor"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{msg.message}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    msg.senderType === "doctor"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Chat() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    chatConversations[0]?.patientId || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = chatConversations.filter((conv) =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = chatConversations.find(
    (c) => c.patientId === selectedPatientId
  );

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Patient Chat</h1>
        <p className="text-muted-foreground">
          Real-time communication with patients
        </p>
      </div>

      <Card className="h-[calc(100%-4rem)]">
        <div className="flex h-full">
          {/* Conversation List */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <ScrollArea className="flex-1 p-2">
              <ConversationList
                conversations={filteredConversations}
                selectedId={selectedPatientId}
                onSelect={setSelectedPatientId}
              />
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1">
            <ChatView conversation={selectedConversation || null} />
          </div>
        </div>
      </Card>
    </div>
  );
}
