import { LocalNotifications } from '@capacitor/local-notifications';
import { PetState } from '../types';
import { DECAY_RATES } from '../constants';

export const requestNotificationPermissions = async () => {
  const perm = await LocalNotifications.checkPermissions();
  if (perm.display !== 'granted') {
    await LocalNotifications.requestPermissions();
  }
};

export const syncNotifications = async (state: PetState) => {
  try {
    // 1. Cancel existing notifications to avoid duplicates
    await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }] });

    const notifications = [];
    const now = Date.now();
    const settings = state.settings || {
      soundEnabled: true,
      notifyHunger: true,
      notifyEnergy: true,
      notifyInactivity: true,
    };

    const getRandomMessage = (messages: string[]) => messages[Math.floor(Math.random() * messages.length)];
    
    // 2. English Inactivity
    if (settings.notifyInactivity) {
      const lastLesson = state.lastLessonDate || state.lastUpdate;
      const triggerTime = new Date(lastLesson + 24 * 60 * 60 * 1000); // 24 hours later
      
      if (triggerTime.getTime() > now) {
        const inactivityMsgs = [
          "Pipo sente sua falta! 🐹",
          "Vamos aprender algo novo? 📚",
          "Pipo está com saudades das lições! ✨",
          "Que tal uma palavra nova para hoje? 📝"
        ];
        const inactivityBodies = [
          "Faz um dia que você não estuda Inglês. Vamos praticar?",
          "Seu progresso é importante! Que tal uma lição rápida?",
          "Pipo quer ver você evoluindo. Vamos brincar de aprender?",
          "Não pare agora! O Inglês do Pipo depende de você."
        ];

        notifications.push({
          id: 1,
          title: getRandomMessage(inactivityMsgs),
          body: getRandomMessage(inactivityBodies),
          schedule: { at: triggerTime },
          sound: 'res://raw/notification.mp3',
        });
      }
    }

    // 3. Hunger Notification
    if (settings.notifyHunger && state.hunger > 20) {
      const pointsToCritical = state.hunger - 20;
      const msToCritical = pointsToCritical / DECAY_RATES.hunger;
      const triggerTime = new Date(now + msToCritical);

      const hungerMsgs = [
        "Pipo está com fome! 🍎",
        "Barriguinha roncando! 🥣",
        "Hora do lanche! 🍪",
        "Pipo quer comer! 🍽️"
      ];
      const hungerBodies = [
        "A barriguinha do seu pet está roncando. Que tal um lanche?",
        "Pipo precisa de energia! Vamos dar algo para ele comer?",
        "Não deixe o Pipo com fome. Ele adora as frutinhas!",
        "Hora de alimentar seu melhor amigo digital! 🐹"
      ];

      notifications.push({
        id: 2,
        title: getRandomMessage(hungerMsgs),
        body: getRandomMessage(hungerBodies),
        schedule: { at: triggerTime },
      });
    }

    // 4. Energy Notification
    if (settings.notifyEnergy && state.energy > 20 && !state.isSleeping) {
      const pointsToCritical = state.energy - 20;
      const msToCritical = pointsToCritical / DECAY_RATES.energy;
      const triggerTime = new Date(now + msToCritical);

      const energyMsgs = [
        "Pipo está exausto... 💤",
        "Hora de descansar! 🌙",
        "Zzz... Pipo com sono! 🥱",
        "Bateria acabando! 🔋"
      ];
      const energyBodies = [
        "Seu pet está quase sem energia. Hora de uma soneca!",
        "Pipo precisa recarregar os pixels. Vamos dormir?",
        "Um mestre precisa de descanso. Coloque o Pipo para dormir!",
        "Shhh... Pipo está ficando muito cansado. 🛌"
      ];

      notifications.push({
        id: 3,
        title: getRandomMessage(energyMsgs),
        body: getRandomMessage(energyBodies),
        schedule: { at: triggerTime },
      });
    }

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
    }
  } catch (error) {
    console.error("Error syncing notifications:", error);
  }
};
