import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface AppointmentRequest {
    provider: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({ provider, date }: AppointmentRequest): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentRepository)
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentsInSameDate) {
            throw Error('This appointment is already bookked');
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
