import bcrypt from 'bcrypt';

export function endCodePassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}

export function comparePassword(passwordUserSend: string, hash: string): boolean {
    return bcrypt.compareSync(passwordUserSend, hash);
}
