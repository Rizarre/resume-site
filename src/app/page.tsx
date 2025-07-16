'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skills = [
    'JavaScript', 'TypeScript', 'Next.js', 'Node.js', 'HTML', 'Vue.js', 'CSS',
    'React', 'Tailwind', 'Bootstrap', 'Express', 'NestJS', 'GraphQL', 'React Native',
    'MongoDB', 'SQLite', 'PostgreSQL', 'MySQL', 'Snowflake', 'ClickHouse',
    'AWS', 'Docker', 'Git', 'Firebase', 'Laravel', 'Postman', 'PHP', 'Java', 'Python'
  ];

  const experiences = [
    {
      company: 'MediaJel',
      position: 'L2 Software Engineer',
      duration: '2023 - Present',
      location: 'Manila, Philippines',
      description: 'Developing and maintaining scalable web applications using modern technologies. Working with cross-functional teams to deliver high-quality software solutions.'
    }
  ];

  const projects = [
    {
      title: 'Stinjy',
      description: 'A simple and intuitive budget management application built with React Native and Expo, designed to help users stay on top of their finances throughout the year.',
      tech: ['TypeScript', 'SQLite', 'React Native', 'Expo'],
      link: 'https://github.com/Rizarre/stinjy-money-tracker',
      image: '/images/projects/stinjy.png'
    },
    {
      title: 'ASEA Online Platform',
      description: 'A website for showcasing the work of ASEA iWork Builders Co. with a built in calculator for computing estimated amount of floor area.',
      tech: ['JavaScript', 'Next.js'],
      link: 'https://github.com/Rizarre/ASEA-Project',
      image: '/images/projects/asea.jpg'
    },
    {
      title: 'SurePrice',
      description: 'An Android Mobile Application that utilizes web scraping to compare market prices on markets to see which location has the cheapest product.',
      tech: ['Python', 'Java', 'Android'],
      link: 'https://github.com/Rizarre/SurePrice-Mobile-Prog',
      image: '/images/projects/sureprice.png'
    }
  ];

  const recommendations = [
    {
      name: 'Edward Zuñiga',
      occupation: 'L2 Software Engineer',
      message: 'I had the privilege of working alongside Sean Rizarre Reyes at MediaJel, where we both served as Level 2 Software Engineers. Sean stood out not only for his technical proficiency, especially in tag integrations using TypeScript, but also for his remarkable interpersonal skills—he has a genuine talent for communicating difficult or complex matters in a way that\'s honest, clear, and never abrasive.\n\nWhat makes Sean a valuable teammate is his ability to connect with people. Whether it\'s providing technical feedback, collaborating across functions, or helping resolve blockers, he always manages to deliver his point with respect and empathy. That emotional intelligence makes him a natural collaborator, mentor, and leader.\n\nOn the technical side, Sean\'s expertise in handling JavaScript and TypeScript tag integrations was a massive asset to our team. His code is clean, reliable, and thoughtfully structured. He\'s the kind of developer who doesn\'t just solve problems—he anticipates them, designs with scalability in mind, and ensures solutions are easy to maintain.\n\nIf you\'re looking for someone who can bridge the gap between strong engineering and empathetic communication, I can\'t recommend Sean enough. He\'s a standout team player, a quick learner, and someone who brings both heart and technical excellence to the table.'
    },
    {
      name: 'Jesus Crisologo Dimazana',
      occupation: 'Software Engineer',
      message: 'I had the pleasure of working with Sean on several development projects, and I can confidently say he is one of the most reliable and talented developers I\'ve collaborated with. His technical expertise, particularly in full-stack development, is matched by his problem-solving ability and calm, focused approach under pressure.\n\nSean brings not just clean, maintainable code to the table but also a deep understanding of product requirements and user needs. He consistently goes beyond expectations—whether it\'s optimizing performance, refactoring for scalability, or mentoring junior developers with patience and clarity.\n\nHe\'s a team player through and through, contributing thoughtful ideas during discussions and always willing to help unblock teammates. Anyone would be lucky to have Sean on their engineering team.\n\nHighly recommend him for any development or technical leadership role!'
    },
    {
      name: 'Pacholo Amit',
      occupation: 'Software Engineer | Integrations Manager',
      message: 'I had the privilege of collaborating with Sean on several critical projects, and I can confidently say he is one of the most reliable and dedicated developers I\'ve ever worked with. From the moment he joined our team, Sean demonstrated a natural ability to coordinate efforts, keep everyone aligned, and tackle challenges head-on. He takes every issue seriously—whether it\'s a production bug or an architectural discussion—and works tirelessly until a robust solution is in place.\n\nSean\'s mastery of JavaScript and TypeScript is truly impressive. He consistently crafts clean, maintainable code and elevates our entire codebase by introducing best practices and thoughtful design patterns. As one of our primary software architects, he has led the development of complex features, optimized performance bottlenecks, and ensured our applications scale smoothly. His rapid learning curve means he quickly adapts to new libraries, frameworks, or tools, allowing the team to stay ahead of emerging trends.\n\nBeyond his technical prowess, Sean excels as a team coordinator. He has an uncanny ability to break down complex tasks, delegate responsibilities appropriately, and ensure everyone feels supported and heard. When the team faced tight deadlines, Sean\'s calm yet assertive leadership style helped us navigate ambiguous requirements and deliver high-quality results on schedule. He is always the first to step up during a crisis—whether it\'s gathering the team for an urgent stand-up, staying late to troubleshoot an issue, or mentoring newer developers who need guidance.\n\nOn a personal level, Sean is an absolute joy to work with. His positive attitude, genuine respect for his colleagues, and willingness to lend a helping hand foster a culture of collaboration and trust. He actively encourages open communication, offers constructive feedback during code reviews, and makes time to celebrate team successes. His infectious enthusiasm and strong work ethic have a ripple effect—raising morale and inspiring everyone around him to contribute their best.\n\nIn short, Sean is a fast learner, an exceptional JavaScript/TypeScript expert, and an outstanding team player. Any organization would benefit immensely from his technical talent, leadership skills, and positive spirit. I wholeheartedly recommend Sean for any role that demands technical excellence, strong coordination, and unwavering dedication.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <motion.header 
        className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Sean Rizarre Reyes
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#experience" className="text-slate-600 hover:text-blue-600 transition-colors">Experience</a>
              <a href="#projects" className="text-slate-600 hover:text-blue-600 transition-colors">Projects</a>
              <a href="#recommendations" className="text-slate-600 hover:text-blue-600 transition-colors">Recommendations</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center gap-2"
                onClick={() => window.open('/Sean-Rizarre-Reyes-Resume.pdf', '_blank')}
              >
                <Download className="h-4 w-4" />
                Resume
              </Button>
              <MobileNav />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-blue-100 dark:ring-blue-900">
                <AvatarImage src="/images/me.png" alt="Sean Rizarre Reyes" />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  SR
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent"
            >
              Sean Rizarre Reyes
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-2"
            >
              Software Engineer
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-8"
            >
              <MapPin className="h-5 w-5" />
              <span>Manila, Philippines</span>
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Passionate software engineer with expertise in full-stack development, creating scalable 
              web applications and innovative solutions. I love turning complex problems into simple, 
              beautiful, and intuitive solutions.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/Rizarre', '_blank')}>
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" onClick={() => window.open('https://www.linkedin.com/in/seanrizarre/', '_blank')}>
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="secondary" className="text-sm py-2 px-4 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              My professional journey in software development
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{exp.position}</CardTitle>
                        <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{exp.duration}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{exp.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Some of the projects I&apos;ve worked on that showcase my skills and experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <Button variant="ghost" size="sm" onClick={() => window.open(project.link, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Recommendations</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              What my colleagues say about working with me
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {recommendation.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                        <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                          {recommendation.occupation}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {recommendation.message.split('\n\n').map((paragraph, i) => (
                        <p key={i} className={i > 0 ? 'mt-4' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I&apos;m always open to discussing new opportunities and interesting projects
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-slate-600 dark:text-slate-300">seanrizarre.reyes@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-300">+63 917 866 8799</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-slate-600 dark:text-slate-300">Manila, Philippines</p>
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="text-center">
                <CardTitle className="text-xl mb-2">Ready to Collaborate?</CardTitle>
                <CardDescription className="text-lg">
                  I'm currently available for new opportunities and exciting projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    L2 Software Engineer with expertise in full-stack development, 
                    specializing in JavaScript, TypeScript, and modern web technologies.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3 py-4">
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      Full-Stack Development
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      Team Leadership
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Problem Solving
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                    size="lg"
                    onClick={() => window.open('/Sean-Rizarre-Reyes-Resume.pdf', '_blank')}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Resume
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => window.open('https://github.com/Rizarre', '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open('https://www.linkedin.com/in/seanrizarre/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = 'mailto:seanrizarre.reyes@gmail.com'}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg font-semibold">Sean Rizarre Reyes</p>
              <p className="text-slate-300">Software Engineer</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/Rizarre" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/seanrizarre/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:seanrizarre.reyes@gmail.com" className="text-slate-300 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="text-center text-slate-400">
            <p>&copy; 2024 Sean Rizarre Reyes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
