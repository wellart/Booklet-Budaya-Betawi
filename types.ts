import React from 'react';

export interface ContentSection {
  title: string;
  content: string[];
  imagePrompt?: string; // Used to determine placeholder style
  listItems?: { title?: string; text: string }[];
}

export interface BookletPageProps {
  children: React.ReactNode;
  pageNumber?: number;
  className?: string;
}