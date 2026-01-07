import { 
  Mail, 
  Search, 
  Database, 
  Baby, 
  Coffee, 
  Smartphone, 
  Music, 
  MessageCircle, 
  Globe,
  MessageSquare
} from 'lucide-react';
import { StatConfig } from './types';

// Estimates derived from Worldometer, Internet Live Stats, and 2025 Digital Global Reports.
// Rates are calculated to match daily "Today" totals resetting at Local Midnight.

export const STATS: StatConfig[] = [
  {
    id: 'emails',
    label: 'Emails Sent Today',
    // ~330 Billion per day (Worldometer: ~135B by midday)
    ratePerSecond: 3819444, 
    baseValue: 0,
    icon: Mail,
    color: 'text-cyan-600 dark:text-cyan-400',
    trivia: "Did you know? Approximately 45% of all emails sent daily are spam, yet email remains the primary communication channel for 4 billion users worldwide."
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Messages Sent',
    // ~140 Billion per day
    ratePerSecond: 1620370, 
    baseValue: 0,
    icon: MessageCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    trivia: "The average user checks WhatsApp more than 23 times per day, contributing to a global volume that could fill 50 Libraries of Congress every second."
  },
  {
    id: 'searches',
    label: 'Google Searches Today',
    // ~9 Billion per day (Worldometer: ~5.3B by midday)
    ratePerSecond: 104166, 
    baseValue: 0,
    icon: Search,
    color: 'text-rose-600 dark:text-rose-400',
    trivia: "15% of all searches seen by Google every day have never been searched before, showing humanity's endless curiosity."
  },
  {
    id: 'data',
    label: 'Internet Traffic (GB) Today',
    // ~180,000 GB per second global traffic estimate
    ratePerSecond: 182500, 
    baseValue: 0,
    icon: Database,
    color: 'text-teal-600 dark:text-teal-300',
    trivia: "By 2025, it's estimated that 463 exabytes of data will be created each day globally. That's the equivalent of 212 million DVDs per day."
  },
  {
    id: 'tweets',
    label: 'Tweets Sent Today',
    // ~800 Million per day (Worldometer: ~437M by midday)
    ratePerSecond: 9259, 
    baseValue: 0,
    icon: MessageSquare,
    color: 'text-sky-600 dark:text-sky-400',
    trivia: "The Library of Congress archived every public tweet from 2006 to 2017, creating one of the largest records of human conversation in history."
  },
  {
    id: 'songs',
    label: 'Songs Streamed Today',
    // ~3.5 Billion streams/day across all platforms
    ratePerSecond: 40509, 
    baseValue: 0,
    icon: Music,
    color: 'text-violet-600 dark:text-violet-400',
    trivia: "Streaming now accounts for over 84% of US music industry revenue, with the average listener streaming 961 hours of music per year."
  },
  {
    id: 'phones',
    label: 'Cellular Phones Sold Today',
    // ~5.6 Million per day (Worldometer: ~3.3M by midday)
    ratePerSecond: 65, 
    baseValue: 0,
    icon: Smartphone,
    color: 'text-indigo-600 dark:text-indigo-400',
    trivia: "There are now more mobile devices on Earth than there are people, with the average replacement cycle for a smartphone being roughly 2.5 years."
  },
  {
    id: 'coffee',
    label: 'Cups of Coffee Consumed',
    // ~2.25 Billion cups per day
    ratePerSecond: 26041, 
    baseValue: 0,
    icon: Coffee,
    color: 'text-amber-600 dark:text-amber-300',
    trivia: "Finland consumes the most coffee per capita, but globally, we drink enough coffee daily to fill 300 Olympic-sized swimming pools."
  },
  {
    id: 'babies',
    label: 'Babies Born Today',
    // ~367,000 per day (Worldometer: ~150k by midday)
    ratePerSecond: 4.25, 
    baseValue: 0,
    icon: Baby,
    color: 'text-yellow-600 dark:text-yellow-300',
    trivia: "About 250 babies are born every minute. That's a new classroom of kindergarteners entering the world every 5 seconds."
  },
  {
    id: 'sites',
    label: 'New Websites Created',
    // ~252,000 per day
    ratePerSecond: 3, 
    baseValue: 0,
    icon: Globe,
    color: 'text-sky-600 dark:text-sky-300',
    trivia: "While over 250,000 new websites are created daily, less than 20% of the 1.1 billion websites on the internet are actually active."
  },
];