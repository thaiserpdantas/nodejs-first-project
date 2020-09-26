import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface AppointmentRequest {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentRepository;

    constructor(appoitmentRepository: AppointmentRepository) {
        this.appointmentsRepository = appoitmentRepository;
    }

    public execute({ provider, date }: AppointmentRequest): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentsInSameDate) {
            throw Error('This appointment is already bookked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
