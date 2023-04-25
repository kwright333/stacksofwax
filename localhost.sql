-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2023 at 06:27 PM
-- Server version: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stacks_of_wax`
--
DROP DATABASE IF EXISTS `stacks_of_wax`;
CREATE DATABASE IF NOT EXISTS `stacks_of_wax` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `stacks_of_wax`;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `member_id` int(11) NOT NULL,
  `vinyl_collection_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `first_name`, `last_name`, `age`, `email`, `password`, `country`, `gender`) VALUES
(1, 'Sean', 'Kennedy', 28, 'sean@hotmail.co.uk', 'apples1!', 'UK', 'Male'),
(2, 'asad', 'adwdawd', 2, 'awdawd@awdawd', 'awdawda', 'awdawd', 'awdawd'),
(3, 'Kiera', 'Wright', 29, 'kwright3@hotmail.co.uk', 'password', 'Northern Ireland', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `vinyl_id` int(11) DEFAULT NULL,
  `vinyl_collection_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`rating_id`, `member_id`, `vinyl_id`, `vinyl_collection_id`) VALUES
(2, 1, NULL, 1),
(3, 1, NULL, 1),
(4, 1, NULL, 1),
(9, 1, NULL, 1),
(11, 1, 5, NULL),
(13, 1, 5, NULL),
(14, 1, 5, NULL),
(15, 1, 5, NULL),
(16, 1, 5, NULL),
(17, 1, 5, NULL),
(18, 1, NULL, 17);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2d1MKsAiU617skzo6g6j1KWKFyBxfZCx', 1682465260, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"memberId\":1}');

-- --------------------------------------------------------

--
-- Table structure for table `vinyl`
--

CREATE TABLE `vinyl` (
  `vinyl_id` int(11) NOT NULL,
  `album` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `record_company` varchar(255) NOT NULL,
  `tracklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tracklist`)),
  `like_count` int(11) NOT NULL,
  `album_art` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vinyl`
--

INSERT INTO `vinyl` (`vinyl_id`, `album`, `artist`, `year`, `genre`, `record_company`, `tracklist`, `like_count`, `album_art`) VALUES
(5, 'Dark Side of the Moon', 'Pink Floyd', 1973, 'Progressive Rock', 'Harvest', '[\"Harvest\",\"Capitol\",\"Speak to Me\",\"Breathe\",\"On the Run\",\"Time\",\"The Great Gig in the Sky\",\"Money\",\"Us and Them\",\"Any Colour You Like\",\"Brain Damage\",\"Eclipse\"]', 15, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png'),
(6, 'Rumours', 'Fleetwood Mac', 1977, 'Pop Rock', 'Warner Bros.', '[\"Warner Bros.\",\"Second Hand News\",\"Dreams\",\"Never Going Back Again\",\"Don\'t Stop\",\"Go Your Own Way\",\"Songbird\",\"The Chain\",\"You Make Loving Fun\",\"I Don\'t Want to Know\",\"Oh Daddy\",\"Gold Dust Woman\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(7, 'Born to Run', 'Bruce Springsteen', 1975, 'Rock', 'Columbia', '[\"Columbia\",\"Thunder Road\",\"Tenth Avenue Freeze-Out\",\"Night\",\"Backstreets\",\"Born to Run\",\"She\'s the One\",\"Meeting Across the River\",\"Jungleland\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Born_to_Run_%28Front_Cover%29.jpg/220px-Born_to_Run_%28Front_Cover%29.jpg'),
(8, 'Hotel California', 'The Eagles', 1976, 'Rock', 'Asylum', '[\"Asylum\",\"Hotel California\",\"New Kid in Town\",\"Life in the Fast Lane\",\"Wasted Time\",\"Wasted Time (Reprise)\",\"Victim of Love\",\"Pretty Maids All in a Row\",\"Try and Love Again\",\"The Last Resort\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg'),
(9, 'Led Zeppelin IV', 'Led Zeppelin', 1971, 'Hard Rock', 'Atlantic', '[\"Atlantic\",\"Black Dog\",\"Rock and Roll\",\"The Battle of Evermore\",\"Stairway to Heaven\",\"Misty Mountain Hop\",\"Four Sticks\",\"Going to California\",\"When the Levee Breaks\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg'),
(10, 'Sticky Fingers', 'The Rolling Stones', 1971, 'Rock', 'Rolling Stones Records', '[\"Rolling Stones Records\",\"Brown Sugar\",\"Sway\",\"Wild Horses\",\"Can\'t You Hear Me Knocking\",\"You Gotta Move\",\"Bitch\",\"I Got the Blues\",\"Sister Morphine\",\"Dead Flowers\",\"Moonlight Mile\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/57/The_Rolling_Stones_-_Sticky_Fingers.png'),
(11, 'Court and Spark', 'Joni Mitchell', 1974, 'Folk Rock', 'Asylum', '[\"Asylum\",\"Court and Spark\",\"Help Me\",\"Free Man in Paris\",\"People\'s Parties\",\"The Same Situation\",\"Car on a Hill\",\"Down to You\",\"Just Like This Train\",\"Raised on Robbery\",\"Trouble Child\",\"Twisted\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Courtandspark.jpeg/220px-Courtandspark.jpeg'),
(12, 'Aja', 'Steely Dan', 1977, 'Jazz Fusion', 'ABC', '[\"ABC\",\"Black Cow\",\"Aja\",\"Deacon Blues\",\"Peg\",\"Home at Last\",\"I Got the News\",\"Josie\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/4/49/Aja_album_cover.jpg'),
(13, 'Songs in the Key of Life', 'Stevie Wonder', 1976, 'Soul', 'Tamla', '[\"Tamla\",\"Love\'s in Need of Love Today\",\"Have a Talk with God\",\"Village Ghetto Land\",\"Contusion\",\"Sir Duke\",\"I Wish\",\"Knocks Me Off My Feet\",\"Pastime Paradise\",\"Summer Soft\",\"Ordinary Pain\",\"Isn\'t She Lovely\",\"Joy Inside My Tears\",\"Black Man\",\"Ngiculela - Es Una Historia - I Am Singing\",\"If It\'s Magic\",\"As\",\"Another Star\"]', 0, 'https://m.media-amazon.com/images/I/715-vmTVuWL._AC_SX355_.jpg'),
(14, 'Parallel Lines', 'Blondie', 1978, 'New Wave', 'Chrysalis', '[\"Chrysalis\",\"Hanging on the Telephone\",\"One Way or Another\",\"Picture This\",\"Fade Away and Radiate\",\"Pretty Baby\",\"I Know but I Don\'t Know\",\"11:59\",\"Will Anything Happen?\",\"Sunday Girl\",\"Heart of Glass\",\"I\'m Gonna Love You Too\",\"Just Go Away\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/4/48/Blondie_-_Parallel_Lines.png'),
(15, 'Parallel Universe', 'Red Hot Chili Peppers', 2002, 'Alternative Rock', 'Warner Bros.', '[\"Warner Bros.\",\"By the Way\",\"Universally Speaking\",\"This Is the Place\",\"Dosed\",\"Don\'t Forget Me\",\"The Zephyr Song\",\"Can\'t Stop\",\"I Could Die for You\",\"Midnight\",\"Throw Away Your Television\",\"Cabron\"]', 0, 'https://i1.sndcdn.com/artworks-KXddRwdVHfvNyWda-FyspDw-t500x500.jpg'),
(16, 'Thriller', 'Michael Jackson', 1982, 'Pop', 'Epic', '[\"Epic\",\"Wanna Be Startin\' Somethin\'\",\"Baby Be Mine\",\"The Girl Is Mine (with Paul McCartney)\",\"Thriller\",\"Beat It\",\"Billie Jean\",\"Human Nature\",\"P.Y.T. (Pretty Young Thing)\",\"The Lady in My Life\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png'),
(17, 'Purple Rain', 'Prince and The Revolution', 1984, 'Pop', 'Warner Bros.', '[\"Warner Bros.\",\"Let\'s Go Crazy\",\"Take Me With U\",\"The Beautiful Ones\",\"Computer Blue\",\"Darling Nikki\",\"When Doves Cry\",\"I Would Die 4 U\",\"Baby I\'m a Star\",\"Purple Rain\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg'),
(18, 'The Joshua Tree', 'U2', 1987, 'Rock', 'Island', '[\"Island\",\"Where the Streets Have No Name\",\"I Still Haven\'t Found What I\'m Looking For\",\"With or Without You\",\"Bullet the Blue Sky\",\"Running to Stand Still\",\"Red Hill Mining Town\",\"In God\'s Country\",\"Trip Through Your Wires\",\"One Tree Hill\",\"Exit\",\"Mothers of the Disappeared\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/6/6b/The_Joshua_Tree.png'),
(19, 'Appetite for Destruction', 'Guns N\' Roses', 1987, 'Hard Rock', 'Geffen', '[\"Geffen\",\"Welcome to the Jungle\",\"It\'s So Easy\",\"Nightrain\",\"Out ta Get Me\",\"Mr. Brownstone\",\"Paradise City\",\"My Michelle\",\"Think About You\",\"Sweet Child o\' Mine\",\"You\'re Crazy\",\"Anything Goes\",\"Rocket Queen\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg'),
(20, 'Synchronicity', 'The Police', 1983, 'Rock', 'A&M', '[\"A&M\",\"Synchronicity I\",\"Walking in Your Footsteps\",\"O My God\",\"Mother\",\"Miss Gradenko\",\"Synchronicity II\",\"Every Breath You Take\",\"King of Pain\",\"Wrapped Around Your Finger\",\"Tea in the Sahara\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/7/7f/Police-album-synchronicity.jpg'),
(21, 'Born in the U.S.A.', 'Bruce Springsteen', 1984, 'Rock', 'Columbia', '[\"Columbia\",\"Born in the U.S.A.\",\"Cover Me\",\"Darlington County\",\"Working on the Highway\",\"Downbound Train\",\"I\'m on Fire\",\"No Surrender\",\"Bobby Jean\",\"I\'m Goin\' Down\",\"Glory Days\",\"Dancing in the Dark\",\"My Hometown\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/3/31/BruceBorn1984.JPG'),
(22, 'Like a Prayer', 'Madonna', 1989, 'Pop', 'Sire', '[\"Sire\",\"Cherish\",\"Express Yourself\",\"Love Song\",\"Oh Father\",\"Promise to Try\",\"Keep It Together\",\"Spanish Eyes\",\"Act of Contrition\",\"Like a Prayer\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Madonna_-_Like_a_Prayer_album.png/220px-Madonna_-_Like_a_Prayer_album.png'),
(23, 'Hysteria', 'Def Leppard', 1987, 'Rock', 'Mercury', '[\"Mercury\",\"Women\",\"Rocket\",\"Animal\",\"Love Bites\",\"Pour Some Sugar on Me\",\"Armageddon It\",\"Gods of War\",\"Don\'t Shoot Shotgun\",\"Run Riot\",\"Hysteria\",\"Excitable\",\"Love and Affection\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/4/40/Def_Leppard_-_Hysteria_%28vinyl_version%29.jpg'),
(24, 'Graceland', 'Paul Simon', 1986, 'Folk Rock', 'Warner Bros.', '[\"Warner Bros.\",\"The Boy in the Bubble\",\"Graceland\",\"I Know What I Know\",\"Gumboots\",\"Diamonds on the Soles of Her Shoes\",\"You Can Call Me Al\",\"Under African Skies\",\"Homeless\",\"Crazy Love\",\"Vol. II\",\"That Was Your Mother\",\"All Around the World or The Myth of Fingerprints\"]', 0, 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Graceland_cover_-_Paul_Simon.jpg'),
(25, 'Born to Run', 'Bruce Springsteen', 1987, 'Rock', 'Columbia', '[\"Columbia\",\"Tougher Than the Rest\",\"All That Heaven Will Allow\",\"Spare Parts\",\"Cautious Man\",\"Walk Like a Man\",\"Tunnel of Love\",\"Two Faces\",\"Brilliant Disguise\",\"One Step Up\",\"When You\'re Alone\",\"Valentine\'s Day\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Born_to_Run_%28Front_Cover%29.jpg/220px-Born_to_Run_%28Front_Cover%29.jpg'),
(26, 'Rio', 'Duran Duran', 1982, 'New Wave', 'Capitol', '[\"Capitol\",\"Rio\",\"My Own Way\",\"Lonely in Your Nightmare\",\"Hungry Like the Wolf\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/a/ac/DuranRio.jpg'),
(27, 'Kind of Blue', 'Miles Davis', 1959, 'Jazz', 'Columbia', '[\"Columbia\",\"So What\",\"Freddie Freeloader\",\"Blue in Green\",\"All Blues\",\"Flamenco Sketches\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg'),
(28, 'The Beatles (The White Album)', 'The Beatles', 1968, 'Rock', 'Apple', '[\"Apple\",\"Back in the U.S.S.R.\",\"Dear Prudence\",\"Glass Onion\",\"Ob-La-Di\",\"Ob-La-Da\",\"Wild Honey Pie\",\"The Continuing Story of Bungalow Bill\",\"While My Guitar Gently Weeps\",\"Happiness Is a Warm Gun\",\"Martha My Dear\",\"I\'m So Tired\",\"Blackbird\",\"Piggies\",\"Rocky Raccoon\",\"Don\'t Pass Me By\",\"Why Don\'t We Do It in the Road?\",\"I Will\",\"Julia\",\"Birthday\",\"Yer Blues\",\"Mother Nature\'s Son\",\"Everybody\'s Got Something to Hide Except Me and My Monkey\",\"Sexy Sadie\",\"Helter Skelter\",\"Long\",\"Long\",\"Long\",\"Revolution 1\",\"Honey Pie\",\"Savoy Truffle\",\"Cry Baby Cry\",\"Revolution 9\",\"Good Night\"]', 0, 'https://upload.wikimedia.org/wikipedia/commons/2/20/TheBeatles68LP.jpg'),
(29, 'Pet Sounds', 'The Beach Boys', 1966, 'Rock', 'Capitol', '[\"Capitol\",\"Wouldn\'t It Be Nice\",\"You Still Believe in Me\",\"That\'s Not Me\",\"Don\'t Talk (Put Your Head on My Shoulder)\",\"I\'m Waiting for the Day\",\"Let\'s Go Away for Awhile\",\"Sloop John B\",\"God Only Knows\",\"I Know There\'s an Answer\",\"Here Today\",\"I Just Wasn\'t Made for These Times\",\"Pet Sounds\",\"Caroline\",\"No\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/PetSoundsCover.jpg/220px-PetSoundsCover.jpg'),
(30, 'Highway 61 Revisited', 'Bob Dylan', 1965, 'Rock', 'Columbia', '[\"Columbia\",\"Like a Rolling Stone\",\"Tombstone Blues\",\"It Takes a Lot to Laugh\",\"It Takes a Train to Cry\",\"From a Buick 6\",\"Ballad of a Thin Man\",\"Queen Jane Approximately\",\"Highway 61 Revisited\",\"Just Like Tom Thumb\'s Blues\",\"Desolation Row\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/9/95/Bob_Dylan_-_Highway_61_Revisited.jpg'),
(31, 'The Velvet Underground and Nico', 'The Velvet Underground', 1967, 'Rock', 'Verve', '[\"Verve\",\"Sunday Morning\",\"I\'m Waiting for the Man\",\"Femme Fatale\",\"Venus in Furs\",\"Run Run Run\",\"All Tomorrow\'s Parties\",\"Heroin\",\"There She Goes Again\",\"I\'ll Be Your Mirror\",\"The Black Angel\'s Death Song\",\"European Son\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/0/0c/Velvet_Underground_and_Nico.jpg'),
(32, 'Led Zeppelin', 'Led Zeppelin', 1969, 'Rock', 'Atlantic', '[\"Atlantic\",\"Good Times Bad Times\",\"Babe I\'m Gonna Leave You\",\"You Shook Me\",\"Dazed and Confused\",\"Your Time Is Gonna Come\",\"Black Mountain Side\",\"Communication Breakdown\",\"I Can\'t Quit You Baby\",\"How Many More Times\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/e/ef/Led_Zeppelin_-_Led_Zeppelin_%281969%29_front_cover.png'),
(33, 'Are You Experienced', 'The Jimi Hendrix Experience', 1967, 'Rock', 'Track', '[\"Track\",\"Foxy Lady\",\"Manic Depression\",\"Red House\",\"Can You See Me\",\"Love or Confusion\",\"I Don\'t Live Today\",\"May This Be Love\",\"Fire\",\"Third Stone from the Sun\",\"Remember\",\"Are You Experienced?\"]', 0, 'https://upload.wikimedia.org/wikipedia/commons/3/33/Are_You_Experienced_-_US_cover-edit.jpg'),
(34, 'Sgt. Pepper\'s Lonely Hearts Club Band', 'The Beatles', 1967, 'Rock', 'Parlophone', '[\"Parlophone\",\"Sgt. Pepper\'s Lonely Hearts Club Band\",\"With a Little Help from My Friends\",\"Lucy in the Sky with Diamonds\",\"Getting Better\",\"Fixing a Hole\",\"She\'s Leaving Home\",\"Being for the Benefit of Mr. Kite!\",\"Within You Without You\",\"When I\'m Sixty-Four\",\"Lovely Rita\",\"Good Morning Good Morning\",\"Sgt. Pepper\'s Lonely Hearts Club Band (Reprise)\",\"A Day in the Life\"]', 0, 'https://www.udiscovermusic.com/wp-content/uploads/2018/01/SgtPepper-1.jpg'),
(35, 'Nevermind', 'Nirvana', 1991, 'Rock', 'DGC', '[\"DGC\",\"Smells Like Teen Spirit\",\"In Bloom\",\"Come as You Are\",\"Breed\",\"Lithium\",\"Polly\",\"Territorial Pissings\",\"Drain You\",\"Lounge Act\",\"Stay Away\",\"On a Plain\",\"Something in the Way\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg'),
(36, 'The Chronic', 'Dr. Dre', 1992, 'Hip hop', 'Death Row', '[\"Death Row\",\"The Chronic (Intro)\",\"Fuck wit Dre Day (And Everybody\'s Celebratin\')\",\"Let Me Ride\",\"The Day the Niggaz Took Over\",\"Nuthin\' but a G Thang\",\"Deeez Nuuuts\",\"Lil\' Ghetto Boy\",\"A Nigga Witta Gun\",\"Rat-Tat-Tat-Tat\",\"The $20 Sack Pyramid\",\"Lyrical Gangbang\",\"High Powered\",\"The Doctor\'s Office\",\"Stranded on Death Row\",\"The Roach (The Chronic Outro)\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg'),
(37, 'OK Computer', 'Radiohead', 1997, 'Rock', 'Parlophone', '[\"Parlophone\",\"Airbag\",\"Paranoid Android\",\"Subterranean Homesick Alien\",\"Exit Music (For a Film)\",\"Let Down\",\"Karma Police\",\"Fitter Happier\",\"Electioneering\",\"Climbing Up the Walls\",\"No Surprises\",\"Lucky\",\"The Tourist\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png'),
(38, 'The Miseducation of Lauryn Hill', 'Lauryn Hill', 1998, 'Hip hop', 'Ruffhouse', '[\"Ruffhouse\",\"Intro\",\"Lost Ones\",\"Ex-Factor\",\"To Zion\",\"Doo Wop (That Thing)\",\"Superstar\",\"Final Hour\",\"When It Hurts So Bad\",\"I Used to Love Him\",\"Forgive Them Father\",\"Every Ghetto\",\"Every City\",\"Nothing Even Matters\",\"Everything Is Everything\",\"The Miseducation of Lauryn Hill\",\"Can\'t Take My Eyes Off of You\",\"Tell Him\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/55/LaurynHillTheMiseducationofLaurynHillalbumcover.jpg'),
(39, 'The Bends', 'Radiohead', 1995, 'Rock', 'Parlophone', '[\"Parlophone\",\"Planet Telex\",\"The Bends\",\"High and Dry\",\"Fake Plastic Trees\",\"Bones\",\"(Nice Dream)\",\"Just\",\"My Iron Lung\",\"Bullet Proof..I Wish I Was\",\"Black Star\",\"Sulk\",\"Street Spirit (Fade Out)\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png'),
(40, 'Enter the Wu-Tang (36 Chambers)', 'Wu-Tang Clan', 1993, 'Hip hop', 'Loud', '[\"Loud\",\"Bring da Ruckus\",\"Shame on a Nigga\",\"Clan in da Front\",\"Wu-Tang: 7th Chamber\",\"Can It Be All So Simple\",\"Protect Ya Neck\",\"Intermission\",\"Da Mystery of Chessboxin\'\",\"Wu-Tang Clan Ain\'t Nuthing ta Fuck Wit\",\"C.R.E.A.M.\",\"Method Man\",\"Tearz\",\"Wu-Tang: 7th Chamber - Part II\",\"Conclusion\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/53/Wu-TangClanEntertheWu-Tangalbumcover.jpg'),
(41, 'Automatic for the People', 'R.E.M.', 1992, 'Rock', 'Warner Bros.', '[\"Warner Bros.\",\"Drive\",\"Try Not to Breathe\",\"The Sidewinder Sleeps Tonite\",\"Everybody Hurts\",\"New Orleans Instrumental No. 1\",\"Sweetness Follows\",\"Monty Got a Raw Deal\",\"Ignoreland\",\"Star Me Kitten\",\"Man on the Moon\",\"Nightswimming\",\"Find the River\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/8/85/R.E.M._-_Automatic_for_the_People.jpg'),
(42, 'The Downward Spiral', 'Nine Inch Nails', 1994, 'Industrial Rock', 'Mr. Self Destruct', '[\"Mr. Self Destruct\",\"Piggy\",\"Heresy\",\"March of the Pigs\",\"Closer\",\"Ruiner\",\"The Becoming\",\"I Do Not Want This\",\"Big Man with a Gun\",\"A Warm Place\",\"Eraser\",\"Reptile\",\"The Downward Spiral\",\"Hurt\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Official_Album_Cover_of_%22The_Downward_Spiral%22_by_Nine_Inch_Nails.png'),
(43, 'Kid A', 'Radiohead', 2000, 'Rock', 'Parlophone', '[\"Parlophone\",\"Everything in Its Right Place\",\"Kid A\",\"The National Anthem\",\"How to Disappear Completely\",\"Treefingers\",\"Optimistic\",\"In Limbo\",\"Idioteque\",\"Morning Bell\",\"Motion Picture Soundtrack\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkida.png'),
(44, 'Yankee Hotel Foxtrot', 'Wilco', 2002, 'Rock', 'Nonesuch', '[\"Nonesuch\",\"I Am Trying to Break Your Heart\",\"Kamera\",\"Radio Cure\",\"War on War\",\"Jesus\",\"Etc.\",\"Ashes of American Flags\",\"Heavy Metal Drummer\",\"I\'m the Man Who Loves You\",\"Pot Kettle Black\",\"Poor Places\",\"Reservations\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/1/1c/Yankee_Hotel_Foxtrot_%28Front_Cover%29.png'),
(45, 'Discovery', 'Daft Punk', 2001, 'Electronic', 'Virgin', '[\"Virgin\",\"One More Time\",\"Aerodynamic\",\"Digital Love\",\"Harder\",\"Better\",\"Faster\",\"Stronger\",\"Crescendolls\",\"Nightvision\",\"Superheroes\",\"High Life\",\"Something About Us\",\"Voyager\",\"Veridis Quo\",\"Short Circuit\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png'),
(46, 'Is This It', 'The Strokes', 2001, 'Rock', 'RCA', '[\"RCA\",\"Is This It\",\"The Modern Age\",\"Soma\",\"Barely Legal\",\"Someday\",\"Alone\",\"Together\",\"Last Nite\",\"Hard to Explain\",\"New York City Cops\",\"Trying Your Luck\",\"Take It or Leave It\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/The_Strokes_-_Is_This_It_cover.png/220px-The_Strokes_-_Is_This_It_cover.png'),
(47, 'American Idiot', 'Green Day', 2004, 'Rock', 'Reprise', '[\"Reprise\",\"American Idiot\",\"Jesus of Suburbia\",\"Holiday\",\"Boulevard of Broken Dreams\",\"Are We the Waiting\",\"St. Jimmy\",\"Give Me Novacaine\",\"She\'s a Rebel\",\"Extraordinary Girl\",\"Letterbomb\",\"Wake Me Up When September Ends\",\"Homecoming\",\"Whatsername\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/e/ed/Green_Day_-_American_Idiot_album_cover.png'),
(48, 'Funeral', 'Arcade Fire', 2004, 'Rock', 'Merge', '[\"Merge\",\"Neighborhood #1 (Tunnels)\",\"Neighborhood #2 (Laika)\",\"Une année sans lumière\",\"Neighborhood #3 (Power Out)\",\"Neighborhood #4 (7 Kettles)\",\"Crown of Love\",\"Wake Up\",\"Haiti\",\"Rebellion (Lies)\",\"In the Backseat\"]', 0, 'https://media.pitchfork.com/photos/5929a1a8c0084474cd0bfe6a/1:1/w_450%2Cc_limit/2099047d.jpg'),
(49, 'Graduation', 'Kanye West', 2007, 'Hip hop', 'Roc-A-Fella', '[\"Roc-A-Fella\",\"Good Morning\",\"Champion\",\"Stronger\",\"I Wonder\",\"Good Life\",\"Can\'t Tell Me Nothing\",\"Barry Bonds\",\"Drunk and Hot Girls\",\"Flashing Lights\",\"Everything I Am\",\"The Glory\",\"Homecoming\",\"Big Brother\"]', 0, 'https://m.media-amazon.com/images/I/51YpFcHrX9L._AC_SX355_.jpg'),
(50, 'In Rainbows', 'Radiohead', 2007, 'Rock', 'Self-released', '[\"Self-released\",\"15 Step\",\"Bodysnatchers\",\"Nude\",\"Weird Fishes/Arpeggi\",\"All I Need\",\"Faust Arp\",\"Reckoner\",\"House of Cards\",\"Jigsaw Falling Into Place\",\"Videotape\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png'),
(51, 'Kidulthood to Adulthood', 'Bashy', 2008, 'Hip hop', '2NV', '[\"2NV\",\"Kidulthood to Adulthood\",\"Black Boys\",\"Who Wants to Be a Millionaire?\",\"Never See Me Fall\",\"Your Wish Is My Command\",\"Don\'t Go There\",\"Where\'s Your Love?\",\"Fantasy\",\"Before Before\",\"Freeze Snap\",\"Life\"]', 0, 'https://cdn.albumoftheyear.org/album/72562-kidulthood-to-adulthood.jpg'),
(52, 'Merriweather Post Pavilion', 'Animal Collective', 2009, 'Rock', 'Domino', '[\"Domino\",\"In the Flowers\",\"My Girls\",\"Also Frightened\",\"Summertime Clothes\",\"Daily Routine\",\"Bluish\",\"Guys Eyes\",\"Taste\",\"Lion in a Coma\",\"No More Runnin\",\"Brother Sport\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/5a/Animal_Collective_-_Merriweather_Post_Pavilion.png'),
(53, 'Oracular Spectacular', 'MGMT', 2007, 'Rock', 'Columbia', '[\"Columbia\",\"Time to Pretend\",\"Weekend Wars\",\"The Youth\",\"Electric Feel\",\"Kids\",\"4th Dimensional Transition\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/8/83/Oracular_Spectacular_2008.jpg'),
(54, 'My Beautiful Dark Twisted Fantasy', 'Kanye West', 2010, 'Hip hop', 'Roc-A-Fella', '[\"Roc-A-Fella\",\"Dark Fantasy\",\"Gorgeous\",\"POWER\",\"All of the Lights\",\"Monster\",\"So Appalled\",\"Devil in a New Dress\",\"Runaway\",\"Hell of a Life\",\"Blame Game\",\"Lost in the World\",\"Who Will Survive in America\"]', 0, 'https://m.media-amazon.com/images/I/71EYmWxcmdL._AC_SL1400_.jpg'),
(55, '21', 'Adele', 2011, 'Pop', 'XL', '[\"XL\",\"Rolling in the Deep\",\"Rumour Has It\",\"Turning Tables\",\"Don\'t You Remember\",\"Set Fire to the Rain\",\"He Won\'t Go\",\"Take It All\",\"I\'ll Be Waiting\",\"One and Only\",\"Lovesong\",\"Someone Like You\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png'),
(56, 'Bon Iver', 'Bon Iver', 2011, 'Folk', 'Jagjaguwar', '[\"Jagjaguwar\",\"Perth\",\"Minnesota\",\"WI\",\"Holocene\",\"Towers\",\"Michicant\",\"Hinnom\",\"TX\",\"Wash.\",\"Calgary\",\"Lisbon\",\"OH\",\"Beth/Rest\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/5f/Bon_iver.jpg'),
(57, 'Channel Orange', 'Frank Ocean', 2012, 'R&B', 'Def Jam', '[\"Def Jam\",\"Start\",\"Thinkin Bout You\",\"Fertilizer\",\"Sierra Leone\",\"Sweet Life\",\"Not Just Money\",\"Super Rich Kids\",\"Pilot Jones\",\"Crack Rock\",\"Pyramids\",\"Lost\",\"White\",\"Monks\",\"Bad Religion\",\"Pink Matter\",\"Forrest Gump\",\"End\"]', 0, 'https://images.squarespace-cdn.com/content/v1/597febe6725e2529bad5fc50/1518986719673-C6LKKBSTLWZ6Y661UWH6/Channel+Orange+Frank+Ocean.jpg?format=1000w'),
(58, 'Blonde', 'Frank Ocean', 2016, 'R&B', 'Boys Don\'t Cry', '[\"Boys Don\'t Cry\",\"Nikes\",\"Ivy\",\"Pink + White\",\"Be Yourself\",\"Solo\",\"Skyline To\",\"Self Control\",\"Good Guy\",\"Nights\",\"Solo (Reprise)\",\"Pretty Sweet\",\"Facebook Story\",\"Close to You\",\"White Ferrari\",\"Siegfried\",\"Godspeed\",\"Futura Free\"]', 10, 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'),
(59, 'Good Kid', 'M.A.A.D City', 2012, 'Hip hop', 'Aftermath', '[\"Aftermath\",\"Sherane a.k.a Master Splinter\'s Daughter\",\"Bitch\",\"Don\'t Kill My Vibe\",\"Backseat Freestyle\",\"The Art of Peer Pressure\",\"Money Trees\",\"Poetic Justice\",\"good kid\",\"m.A.A.d city\",\"Swimming Pools (Drank)\",\"Sing About Me\",\"I\'m Dying of Thirst\",\"Real\",\"Compton\"]', 0, 'https://m.media-amazon.com/images/I/81EYtj8oi3L._AC_SX425_.jpg'),
(60, 'To Pimp a Butterfly', 'Kendrick Lamar', 2015, 'Hip hop', 'Aftermath', '[\"Aftermath\",\"Wesley\'s Theory\",\"For Free? (Interlude)\",\"King Kunta\",\"Institutionalized\",\"These Walls\",\"u\",\"Alright\",\"For Sale? (Interlude)\",\"Momma\",\"Hood Politics\",\"How Much a Dollar Cost\",\"Complexion\",\"The Blacker the Berry\",\"You Ain\'t Gotta Lie (Momma Said)\",\"i\",\"Mortal Man\"]', 0, 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=620&quality=85&auto=format&fit=max&s=1bb96ed49608e22a3d9f6fefff086971'),
(61, 'Random Access Memories', 'Daft Punk', 2013, 'Electronic', 'Columbia', '[\"Columbia\",\"Give Life Back to Music\",\"The Game of Love\",\"Giorgio by Moroder\",\"Within\",\"Instant Crush\",\"Lose Yourself to Dance\",\"Touch\",\"Get Lucky\",\"Beyond\",\"Motherboard\",\"Fragments of Time\",\"Doin\' It Right\",\"Contact\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg'),
(62, 'The Heist', 'Macklemore & Ryan Lewis', 2012, 'Hip hop', 'Macklemore', '[\"Macklemore\",\"Ten Thousand Hours\",\"Can\'t Hold Us\",\"Thrift Shop\",\"Thin Line\",\"Same Love\",\"Make the Money\",\"Neon Cathedral\",\"BomBom\",\"White Walls\",\"Jimmy Iovine\",\"Wing$\",\"A Wake\",\"Gold\",\"Starting Over\",\"Cowboy Boots\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/3/3a/The_Heist_cover.png'),
(63, 'My Head Is an Animal', 'Of Monsters and Men', 2011, 'Rock', 'Record', '[\"Record\",\"Dirty Paws\",\"King and Lionheart\",\"Numb Bears\",\"Sloom\",\"Little Talks\",\"From Finner\",\"Six Weeks\",\"Love Love Love\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/0/07/My_Head_Is_An_Animal.jpg'),
(64, 'The Best of Muddy Waters', 'Muddy Waters', 1958, 'Blues', '1. I Just Want To Make Love To You', '[\"1. I Just Want To Make Love To You\",\"2. Long Distance Call\",\"3. Louisiana Blues\",\"4. Honey Bee\",\"5. Rollin\' Stone\",\"6. I\'m Ready\",\"7. Hoochie Coochie Man\",\"8. She Moves Me\",\"9. I Want You To Love Me\",\"10. Standing Around Crying\",\"11. Still A Fool\",\"12. I Can\'t Be Satisfied\"]', 0, 'https://upload.wikimedia.org/wikipedia/en/5/51/Best_of_Muddy_Waters_1958_Chess_Records.jpg'),
(65, 'Greatest Trumpet Hits', 'Al Hirt', 2023, 'Jazz', 'Reel', '[  \"I Can\'t Get Started\",\"Memories of You You Made Me Love You\",\"Stardust the Man with the Horn\",\"Wonderland By Night Oh! My Pa-Pa (O Mein Papa)\",\"Stardreams\",\"Rhapsody in Blue\",\"A Trumpeter\'s Lullaby Bugler\'s Holiday\",\"Hot Lips Sugar Blues\",\"Oh Marie Marie\",\"Gonna Fly Now (Theme from)\",\"Java\",\"Tuxedo Junction\",\"Feels So Good\",\"A Night in Tunisia\",\"Cherry Pink and Apple Blossom White\",\"The Toy Trumpet\",\"Tenderly\",\"When It\'s Sleepy Time Down South Hello Dolly\",\"And the Angels Sing\",\"Boy Meets Horn\",\"Ciribiribin\",\"Rise\",\"After You\'ve Gone\"]', 0, 'https://upcomingvinyl.com/pics/covers/a/al-hirt-greatest-trumpet-hits.jpg'),
(66, 'I\'ll Never Forget', 'Allan Clarke', 2023, 'Soft Rock', 'Bmg Rights Management Uk Ltd', '[\"You Need Someone To Save You\",\"I\'ll Never Forget\",\"The Presence of You\",\"Movin\' On\",\"When Love Walked Out the Room\",\"You Shine a Light\",\"You Didn\'t Like It\",\"Buddy\'s Back\",\"Let\'s Take This Back to Bed\",\"Maybe the Next Time\",\"Who Am I?\"]', 0, 'https://upcomingvinyl.com/pics/covers/a/allan-clarke-i-ll-never-forget.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `vinyl_collection`
--

CREATE TABLE `vinyl_collection` (
  `vinyl_collection_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `vinyl_collection_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `like_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vinyl_collection`
--

INSERT INTO `vinyl_collection` (`vinyl_collection_id`, `member_id`, `vinyl_collection_name`, `description`, `like_count`) VALUES
(1, 1, 'collection 1', 'Test Desc', 4),
(2, 1, 'collection 2', 'asdasdzxzxc', 2),
(3, 1, 'asdasd', 'asdasd', 0),
(4, 1, 'asdasd', 'asdasd', 0),
(5, 1, 'asdasd', 'asdasd', 0),
(6, 1, 'asdasd', 'asdasd', 0),
(7, 1, 'asdasd', 'asdasd', 0),
(8, 1, 'asdasd', 'asdasd', 0),
(9, 1, 'asdasd', 'asdasd', 0),
(10, 1, 'asdasd', 'asdasd', 0),
(11, 1, 'test', 'testdesc', 0),
(12, 1, 'testdesc', 'asdasd', 0),
(13, 1, 'asdasd', 'asdsdf', 0),
(14, 1, 'sean', 'eeewww', 0),
(15, 1, 'qqq', 'qwwq', 0),
(16, 1, 'qq', 'wqwq', 0),
(17, 1, 'xdfgbh', 'sdfg', 3);

-- --------------------------------------------------------

--
-- Table structure for table `vinyl_collections_items`
--

CREATE TABLE `vinyl_collections_items` (
  `vinyl_collection_id` int(11) NOT NULL,
  `vinyl_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vinyl_collections_items`
--

INSERT INTO `vinyl_collections_items` (`vinyl_collection_id`, `vinyl_id`) VALUES
(1, 19),
(1, 47),
(6, 5),
(7, 5),
(7, 7),
(8, 5),
(8, 7),
(9, 5),
(9, 7),
(10, 11),
(12, 7),
(14, 12),
(14, 14),
(15, 6),
(15, 9),
(16, 11),
(16, 12),
(17, 7),
(17, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `FK_member_id_comment` (`member_id`),
  ADD KEY `FK_vinyl_collection_id_comment` (`vinyl_collection_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `FK_member_id_rating` (`member_id`),
  ADD KEY `FK_vinyl_collection_id_rating` (`vinyl_collection_id`),
  ADD KEY `FK_vinyl_id_rating` (`vinyl_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `vinyl`
--
ALTER TABLE `vinyl`
  ADD PRIMARY KEY (`vinyl_id`);

--
-- Indexes for table `vinyl_collection`
--
ALTER TABLE `vinyl_collection`
  ADD PRIMARY KEY (`vinyl_collection_id`),
  ADD KEY `fk_member_id_members` (`member_id`);

--
-- Indexes for table `vinyl_collections_items`
--
ALTER TABLE `vinyl_collections_items`
  ADD PRIMARY KEY (`vinyl_collection_id`,`vinyl_id`),
  ADD KEY `fk_vinyl_id_vinyl` (`vinyl_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vinyl`
--
ALTER TABLE `vinyl`
  MODIFY `vinyl_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `vinyl_collection`
--
ALTER TABLE `vinyl_collection`
  MODIFY `vinyl_collection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vinyl_collections_items`
--
ALTER TABLE `vinyl_collections_items`
  MODIFY `vinyl_collection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_member_id_comment` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  ADD CONSTRAINT `FK_vinyl_collection_id_comment` FOREIGN KEY (`vinyl_collection_id`) REFERENCES `vinyl_collection` (`vinyl_collection_id`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `FK_member_id_rating` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  ADD CONSTRAINT `FK_vinyl_collection_id_rating` FOREIGN KEY (`vinyl_collection_id`) REFERENCES `vinyl_collection` (`vinyl_collection_id`),
  ADD CONSTRAINT `FK_vinyl_id_rating` FOREIGN KEY (`vinyl_id`) REFERENCES `vinyl` (`vinyl_id`);

--
-- Constraints for table `vinyl_collection`
--
ALTER TABLE `vinyl_collection`
  ADD CONSTRAINT `fk_member_id_members` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`);

--
-- Constraints for table `vinyl_collections_items`
--
ALTER TABLE `vinyl_collections_items`
  ADD CONSTRAINT `fk_vinyl_collection_id_vinyl_collections` FOREIGN KEY (`vinyl_collection_id`) REFERENCES `vinyl_collection` (`vinyl_collection_id`),
  ADD CONSTRAINT `fk_vinyl_id_vinyl` FOREIGN KEY (`vinyl_id`) REFERENCES `vinyl` (`vinyl_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
